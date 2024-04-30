import React from "react";

const InboxPage = () => {
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <div className="w-full border-2 h-screen flex mb-20">
        <div className="flex flex-col w-[30%] border-r p-2 ">
          <div className="border-b py-2 text-center h-16">
            <h3 className="font-semibold tracking-tight transition-colors">Inbox</h3>
          </div>
        </div>
        <div className="flex flex-col p-2 w-full ">
          <div className="border-b py-2 text-center w-full h-16">
            <h3 className="font-semibold tracking-tight transition-colors">Messages</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
