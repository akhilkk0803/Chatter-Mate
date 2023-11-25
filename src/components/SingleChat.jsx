import React, { useContext, useEffect, useState } from "react";
import { Usercontext } from "../usercontext";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import MyModal from "./MyModal";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineSend } from "@react-icons/all-files/ai/AiOutlineSend";
import UpdateGroupmodal from "./UpdateGroupmodal";
import { url } from "../../url";
import SingleMessage from "./SingleMessage";
import { io } from "socket.io-client";

const socket = io(url);
let selectedChatCompare = null;
const SingleChat = ({ setfetchAgain, fetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notifications,
    setnotifications,
  } = useContext(Usercontext);
  const [loading, setloading] = useState(true);
  const [newMessages, setnewMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false);
  const [currMsgUser, setcurrMsgUser] = useState(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sendLoading, setsendLoading] = useState(false);
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => setsocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  useEffect(() => {
    fetchChats();
    selectedChatCompare = selectedChat;
    setnotifications(
      notifications.filter((noti) => noti.chat._id != selectedChatCompare._id)
    );
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (data) => {
      if (!selectedChatCompare || data.chat._id !== selectedChatCompare._id) {
        // notification
        if (!notifications.find((res) => res.chat._id === data.chat._id)) {
          setnotifications([data, ...notifications]);
          setfetchAgain(!fetchAgain);
        }
      } else {
        console.log("yea");
        console.log(messages);
        setmessages([data, ...messages]);
      }
    });
  });
  const toast = useToast();
  function typinghandler(e) {
    setnewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTyping = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      const timediff = new Date().getTime() - lastTyping;
      if (timediff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, 3000);
  }
  function isSameSender(i, el) {
    if (!el.isGroupChat) return;
    if (i == messages.length - 1) {
      return messages[i - 1].sender._id === messages[i].sender._id;
    }
    return messages[i + 1].sender._id === messages[i].sender._id;
  }

  async function fetchChats() {
    if (!selectedChat) return;
    try {
      setloading(true);
      const data = await fetch(url + "/message/" + selectedChat._id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const res = await data.json();
      setloading(false);
      setmessages(res);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      setloading(false);
      toast({
        title: "Could not get messages",
        duration: 5000,
        status: "error",
      });
    }
  }

  function sendMessage(e) {
    console.log(e);
    if ((e.key === "Enter" && newMessages) || e.type === "click") {
      socket.emit("stop typing", selectedChat._id);
      if (newMessages.trim().length == 0) {
        return;
      }
      setsendLoading(true);
      fetch(url + "/message/", {
        method: "POST",
        body: JSON.stringify({
          msg: newMessages,
          chatId: selectedChat._id,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setsendLoading(false);
          setnewMessage("");
          socket.emit("new message", data);
          setmessages([data, ...messages]);
        })
        .catch((err) => sendLoading(false));
    }
  }
  if (!selectedChat) {
    return (
      <p className="flex min-h-full items-center justify-center text-3xl text-gray-400">
        Click on a user to start Chatting
      </p>
    );
  }
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
      <div
        className={`bg-slate-900 w-full h-[93%] p-4 
        overflow-y-hidden   mb-3 rounded-2xl mt-1`}
      >
        {loading && (
          <div className="flex h-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}

        <div className="h-[85%] overflow-auto flex flex-col-reverse  gap-2 w-full">
          {messages.map((el, i) => (
            <SingleMessage el={el} same={isSameSender(i, el)} />
          ))}
        </div>
        <div className="h-[5%]">
          {isTyping && (
            <div className="text-white  bg-slate-300 w-fit px-4  rounded-full text-xl">
              ...
            </div>
          )}
        </div>
        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
          <InputGroup>
            <Input
              type="text"
              bg="white"
              defaultValue="A message"
              sx={{
                padding: "25px",
              }}
              value={newMessages}
              onChange={typinghandler}
            />
            <InputRightElement>
              <Button
                isLoading={sendLoading}
                rightIcon={<AiOutlineSend size={25} cursor="pointer" />}
                onClick={sendMessage}
              ></Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>
    </>
  );
};

export default SingleChat;
