import Header from "@/components/Header";
import React from "react";

const Page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;

  return (
    <div className="wrapper page">
      <Header
        subHeader="mk@gmail.com"
        title="MK | TS"
        userImg="/assets/images/dummy.jpg"
      />
      <h1>USER ID: {id} </h1>
    </div>
  );
};

export default Page;
