interface CategoryItemsProps {
  name: string;
  title: string;
  imageUrl: string;
  id: number;
}

export const categoryItems: CategoryItemsProps[] = [
  {
    id: 0,
    name: "dogs",
    title: "Dogs",
    imageUrl: "/images/dogFilter.png",
  },
  {
    id: 1,
    name: "cats",
    title: "Cats",
    imageUrl: "/images/catFilter.png",
  },
];

export const descriptionItems: CategoryItemsProps[] = [
  {
    id: 2,
    name: "goodWithOtherAnimals",
    title: "Good with other Animals",
    imageUrl: "/images/goodWithOtherAnimals.png",
  },
  {
    id: 3,
    name: "goodWithFamily",
    title: "Good with family",
    imageUrl: "/images/goodWithFamily.png",
  },
  {
    id: 4,
    name: "needsSpace",
    title: "Needs Space",
    imageUrl: "/images/needsSpace.png",
  },
];
