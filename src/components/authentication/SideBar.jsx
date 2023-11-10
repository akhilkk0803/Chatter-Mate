import {
  Avatar,
  Button,
  Input,
  Skeleton,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Usercontext } from "../../usercontext";

import { url } from "../../../url";
import ChatItem from "../ChatItem";
const SearchBar = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setsearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState(false);
  const { setSelectedChat, setChats, chats } = useContext(Usercontext);

  function getuser() {
    if (search.trim().length === 0) {
      return toast({
        title: "Please enter a email or name",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
    }
    setloading(true);
    fetch(url + "/user/?search=" + search, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        console.log(res);
        setData(res);
      });
  }

  function accessChat(receiver) {
    console.log(receiver);
    setloadingChat(true);
    fetch(url + "/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ receiver }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!chats.find((el) => el._id === data._id)) {
          setChats((prev) => [data, ...prev]);
        }
        setloadingChat(false);
        setSelectedChat(data);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setloadingChat(false);
        toast({
          title: "Error getting chat",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-left",
        });
      });
  }
  return (
    <div className="bg-white flex gap-2">
      <button
        className="flex gap-2 px-6 py-3 rounded-2xl items-center bg-gray-100"
        onClick={onOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
        <p className="font-semibold">Search</p>
      </button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>
          <DrawerBody>
            <div className="flex gap-2">
              <Input
                placeholder="search user with name/email"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                fontSize="14px"
              />
              <Button variant="solid" onClick={getuser}>
                Go
              </Button>
            </div>
            <div className="mt-2 text-black flex flex-col gap-2">
              {loading && (
                <Stack>
                  <Skeleton height="30px"></Skeleton>
                  <Skeleton height="30px"></Skeleton>
                  <Skeleton height="30px"></Skeleton>
                  <Skeleton height="30px"></Skeleton>
                  <Skeleton height="30px"></Skeleton>
                </Stack>
              )}
              {!loading &&
                data.length > 0 &&
                data.map((el) => (
                  <ChatItem el={el} key={el._id} onclick={accessChat} />
                ))}
            </div>
            {loadingChat && <Spinner />}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SearchBar;
