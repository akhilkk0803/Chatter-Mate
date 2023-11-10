import React, { useContext } from "react";
import { Usercontext } from "../usercontext";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import MyModal from "./MyModal";
import {
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineSend } from "@react-icons/all-files/ai/AiOutlineSend";
import UpdateGroupmodal from "./UpdateGroupmodal";
const SingleChat = ({ setfetchAgain, fetchAgain }) => {
  const {  selectedChat, setSelectedChat, user } =
    useContext(Usercontext);
  return (
    <>
      <div className="flex justify-between">
        <p className="md:hidden block" onClick={() => setSelectedChat(null)}>
          {" "}
          <ArrowBackIcon fontSize={30} />
        </p>
        <p className="text-xl md:text-2xl">
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : selectedChat.user[0]._id === user._id
            ? selectedChat.user[1].name
            : selectedChat.user[0].name}
        </p>
        {selectedChat.isGroupChat ? (
          <UpdateGroupmodal
            fetchAgain={fetchAgain}
            setfetchAgain={setfetchAgain}
          >
            <ViewIcon fontSize={30} />
          </UpdateGroupmodal>
        ) : (
          <MyModal
            user={
              selectedChat.user[0]._id === user._id
                ? selectedChat.user[1]
                : selectedChat.user[0]
            }
          >
            <ViewIcon fontSize={30} />
          </MyModal>
        )}
      </div>
      <div className="bg-gray-200 w-full h-[95%] p-4 overflow-y-hidden   mb-3 rounded-2xl">
        <div className="flex justify-start items-end h-full w-full">
          <InputGroup>
            <Input
              type="text"
              bg="white"
              defaultValue="A message"
              sx={{
                padding: "25px",
              }}
            />
            <InputRightElement>
              <AiOutlineSend size={25} cursor="pointer" />
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </>
  );
};

export default SingleChat;
