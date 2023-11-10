import {
  Button,
  Image,
  Input,
  MenuItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";

import { Usercontext } from "../usercontext";
import { useState } from "react";
import { url } from "../../url";
import ChatItem from "./ChatItem";
import { CloseIcon } from "@chakra-ui/icons";
import GroupMembers from "./GroupMembers";

const GroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setchatName] = useState("");
  const [members, setmembers] = useState([]);
  const [suggestion, setsuggestion] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const { setChats } = useContext(Usercontext);
  function handleSearch(e) {
    setisLoading(true);
    fetch(url + "/user/?search=" + e.target.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisLoading(false);
        setsuggestion(data);
      });
  }
  function selectedUser(id, name) {
    if (!members.find((el) => el.id === id)) {
      setmembers((prev) => [{ id, name }, ...prev]);
    }
  }
  function deletemember(id) {
    setmembers((prev) => prev.filter((el) => el.id !== id));
  }
  function handleSubmit() {
    if (!chatName || members.length < 2) {
      toast({
        title: "Enter all details make sure there are atleast 2 members",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    fetch(url + "/chat/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        chatName,
        users: members.map((el) => el.id),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: "Group Created",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.log(data);
        setChats((prev) => [data, ...prev]);
        setsuggestion([]);
        setmembers([]);
        onClose();
      })
      .catch((err) => {
        toast({
          title: "An Error occured",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  }
  return (
    <div>
      <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} size="lg" isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={10}>
          <ModalHeader textAlign="center">Add Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap={2}>
            <FormControl>
              <Input
                name="chatName"
                type="text"
                placeholder="Chat Name"
                onChange={(e) => setchatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                name="users"
                type="text"
                placeholder="Add users Eg:Vishruth,Yeshas,Sachin,Akhil"
                onChange={handleSearch}
              />
            </FormControl>
            {isLoading && (
              <CircularProgress
                isIndeterminate
                color="red.200"
                textAlign="center"
              />
            )}

            {members.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {members.length > 0 &&
                  members.map((el) => (
                    <GroupMembers el={el} deletemember={deletemember} />
                  ))}
              </div>
            )}
            {suggestion.length > 0 && (
              <div className="flex flex-col gap-2 max-h-[250px] p-2 overflow-auto">
                {suggestion.map((el) => (
                  <ChatItem el={el} onclick={selectedUser} />
                ))}
              </div>
            )}
            {/* selected users */}
          </ModalBody>
          <Button onClick={handleSubmit} variant="solid" colorScheme="blue">
            Create Chat
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupModal;
