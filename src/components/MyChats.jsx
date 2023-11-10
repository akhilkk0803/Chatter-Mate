import React, { useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../usercontext";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import MyModal from "./MyModal";
import GroupModal from "./GroupModal";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, chats, setChats, getChats, user } =
    useContext(Usercontext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getChats(token);
  }, [fetchAgain]);
  return (
    <div
      className={` bg-white p-8 md:block  rounded-xl min-h-[82vh] max-h-[82vh] overflow-hidden  'sm:' ${
        selectedChat ? "hidden" : "block"
      } `}
    >
      <div className="flex justify-between mb-5">
        <p className="text-3xl">My Chats</p>
        <GroupModal>
          <Button leftIcon={<AddIcon />} p={4}>
            New Group Chat
          </Button>
        </GroupModal>
      </div>
      <div className="flex flex-col gap-4 max-h-[82vh] overflow-auto ">
        {chats.map((el) => (
          <>
            <div
              onClick={() => setSelectedChat(el)}
              className={`p-3 rounded-xl  cursor-pointer  mr-2 ${
                selectedChat?._id === el._id ? `bg-cyan-300` : "bg-gray-200"
              }`}
            >
              <p className="text-xl mb-2  ">
                {el.isGroupChat
                  ? el.chatName
                  : el.user[0]._id === user._id
                  ? el.user[1].name
                  : el.user[0].name}
              </p>
              <div>
                <p>
                  <span className="font-semibold">
                    {el?.latestMessage?.sender}fdsf:{" "}
                  </span>
                  {el?.latestMessage?.content}
                  fsdf
                </p>
              </div>
              {el.latestMessage && <div></div>}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyChats;
