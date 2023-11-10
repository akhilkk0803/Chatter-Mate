import { createContext, useEffect, useState } from "react";
import { url } from "../url";

export const Usercontext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  function getuser(token) {
    fetch(url + "/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuser(data);
      });
  }
  function getChats(token) {
    console.log("first");
    fetch(url + "/chat/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedChat(
          selectedChat
            ? data.filter((el) => el._id === selectedChat._id)[0]
            : null
        );
        setChats(data);
      });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getuser(token);
      getChats(token);
    }
  }, []);
  return (
    <Usercontext.Provider
      value={{
        user,
        setuser,
        getuser,
        selectedChat,
        setChats,
        chats,
        setSelectedChat,
        getChats,
      }}
    >
      {children}
    </Usercontext.Provider>
  );
};
