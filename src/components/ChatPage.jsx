import React, { useContext, useEffect, useState } from "react";
import { url } from "../../url";
import { Usercontext } from "../usercontext";
import SearchBar from "./authentication/SideBar";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import Notification from "./Notification";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const { user, getuser } = useContext(Usercontext);
  const navigate = useNavigate();
  const [fetchAgain, setfetchAgain] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    if (!user && token) {
      getuser(token);
    }
  }, []);
  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="flex bg-white p-4 justify-between">
        {user && <SearchBar />}
        <p className="text-2xl font-semibold"> Chatter-Mate</p>
        <div className="flex gap-5 items-center">
          <div>
            <Notification />
          </div>
          <div>
            <Profile />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr,2fr] gap-2 p-2 ml-2 mr-2  ">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox setfetchAgain={setfetchAgain} fetchAgain={fetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
