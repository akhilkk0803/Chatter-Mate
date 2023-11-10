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
      {!selectedChat && (
        <p className="flex min-h-full items-center justify-center text-3xl text-gray-400">
          Click on a user to start Chatting
        </p>
      )}
      {selectedChat && (
        <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
      )}
    </div>
  );
};

export default ChatBox;
