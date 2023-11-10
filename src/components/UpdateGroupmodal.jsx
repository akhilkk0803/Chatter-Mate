import React, { useContext, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  Input,
  FormLabel,
  CircularProgress,
} from "@chakra-ui/react";
import ChatItem from "./ChatItem";
import { Usercontext } from "../usercontext";
import { useState } from "react";
import GroupMembers from "./GroupMembers";
import { url } from "../../url";
const UpdateGroupmodal = ({ children, setfetchAgain, fetchAgain }) => {
  const [chatName, setchatName] = useState("");
  const [search, setsearch] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const [loading, setloading] = useState(false);
  const [renameLoading, setrenameLoading] = useState(false);
  const toast = useToast();
  const { selectedChat, getChats, user } = useContext(Usercontext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(selectedChat)
  async function deletemember(id) {
    setloading(true);
    await fetch(url + "/chat/remove", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: id,
        chatId: selectedChat._id,
      }),
    });
    setfetchAgain((prev) => !fetchAgain);
    setloading(false);
  }
  useEffect(() => {
    setchatName(selectedChat.chatName);
  }, []);
  async function renamehandler() {
    if (!chatName) {
      toast({
        title: "Please Add a chat name",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      setrenameLoading(true);
      const res = await fetch(url + "/chat/rename", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chatId: selectedChat._id,
          chatName,
        }),
      });
      setfetchAgain((prev) => !fetchAgain);
      toast({
        title: "updated Succesfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setrenameLoading(false);
    } catch (error) {
      setrenameLoading(false);
      toast({
        title: "An Error Occurred.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  function searchHandler(e) {
    setsearch(e.target.value);
    setloading(true);
    fetch(url + "/user/?search=" + e.target.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setloading(false);
        setsuggestion(data);
      });
  }
  async function selectedUser(id, name) {
    if (!selectedChat.user.find((el) => el.id === id)) {
      setloading(true);
      const res = await fetch(url + "/chat/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          user: id,
        }),
      });
    }
    setloading(false);
    setfetchAgain((prev) => !prev);
  }
  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            sx={{
              textAlign: "center",
            }}
            fontSize="3xl"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex gap-2 flex-wrap mb-3">
              {selectedChat.user.map((el) => (
                <GroupMembers
                  el={el}
                  deletemember={deletemember}
                  canDelete={selectedChat.groupAdmin._id === user._id}
                />
              ))}
            </div>

            <FormLabel>Group Name</FormLabel>
            <FormControl display="flex" mb={3}>
              <Input
                type="text"
                readOnly={selectedChat.groupAdmin._id !== user._id}
                p={5}
                placeholder="ChatName"
                value={chatName}
                onChange={(e) => setchatName(e.target.value)}
              />
              {selectedChat.groupAdmin._id === user._id && (
                <Button
                  isLoading={renameLoading}
                  colorScheme="green"
                  onClick={renamehandler}
                >
                  {" "}
                  Update
                </Button>
              )}
            </FormControl>
            {selectedChat.groupAdmin._id === user._id && (
              <FormControl display="flex">
                <Input
                  type="text"
                  p={5}
                  placeholder="Add Users"
                  value={search}
                  onChange={searchHandler}
                />
              </FormControl>
            )}
            {loading && <CircularProgress isIndeterminate color="red.200" />}
            {suggestion.length > 0 && (
              <div className="flex flex-col gap-2 max-h-[250px] p-2 overflow-auto">
                {suggestion.map((el) => (
                  <ChatItem el={el} onclick={selectedUser} />
                ))}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deletemember(user._id)}
            >
              Leave Group
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupmodal;
