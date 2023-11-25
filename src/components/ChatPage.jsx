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
    <div >
      <div className="flex bg-white mb-10 p-4 justify-between overflow-x-clip">
        {user && <SearchBar />}
        <p className="text-2xl font-semibold hidden md:block"> Chatter-Mate</p>
        <div className="flex gap-10 items-center">
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
