import React, { useContext, useEffect, useState } from "react";
import { Usercontext } from "../usercontext";
import SingleChat from "./SingleChat";
const ChatBox = ({ setfetchAgain, fetchAgain }) => {
  const { selectedChat } = useContext(Usercontext);

  return (
    <div
      className={`bg-white  rounded-xl p-4   min-h-[82vh]  max-h-[82vh] 'sm:' ${
        selectedChat ? "block" : "hidden"
      } md:block`}
    >
      <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
    </div>
  );
};

export default ChatBox;
