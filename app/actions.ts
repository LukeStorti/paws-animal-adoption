"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function registerNPO({ userId }: { userId: string }) {
  // TODO: verify NPO reg number
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isNPO: true,
    },
  });
  return redirect("/");
}

export async function createPet({ userId }: { userId: string }) {
  const data = await prisma.pet.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.pet.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (!data.addedCateogry && !data.addedDescription && !data.addedLocation) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCateogry && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (data.addedCateogry && data.addedDescription && !data.addedLocation) {
    redirect(`/create/${data.id}/address`);
  } else if (data.addedCateogry && data.addedDescription && data.addedLocation) {
    const data = await prisma.pet.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const petId = formData.get("petId") as string;

  const data = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      categoryName: categoryName,
      addedCateogry: true,
    },
  });

  return redirect(`/create/${petId}/description`);
}

export async function createDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const breed = formData.get("breed") as string;
  const description = formData.get("description") as string;
  const age = formData.get("age");
  const imageFile = formData.get("photo") as File;
  const petId = formData.get("petId") as string;
  const goodWithOtherAnimals =
    formData.get("goodWithOtherAnimals") === "true" ? true : (false as boolean);
  const goodWithFamily = formData.get("goodWithFamily") === "true" ? true : (false as boolean);
  const needsSpace = formData.get("needsSpace") === "true" ? true : (false as boolean);

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      title: title,
      description: description,
      breed: breed,
      age: Number(age),
      goodWithOtherAnimals: goodWithOtherAnimals,
      goodWithFamily: goodWithFamily,
      needsSpace: needsSpace,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${petId}/address`);
}

export async function createLocation(formData: FormData) {
  const petId = formData.get("petId") as string;
  const location = formData.get("location") as string;

  const data = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      addedLocation: true,
      location: location,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const petId = formData.get("petId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      petId: petId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function deletePetFromDb(formData: FormData) {
  const petId = formData.get("petId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.pet.delete({
    where: {
      id: petId,
    },
  });

  revalidatePath(pathName);
}
