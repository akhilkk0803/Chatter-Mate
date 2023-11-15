import React, { useContext } from "react";
import { Usercontext } from "../usercontext";
import { Avatar, Tooltip } from "@chakra-ui/react";

const SingleMessage = ({ el, same }) => {
  const date = new Date(el.updatedAt);
  const { user, selectedChat } = useContext(Usercontext);
  return (
    <div
      className={`flex gap-2 p-2  w-full ${
        el.sender._id === user._id ? "justify-end" : "justify-start"
      }`}
    >
      {el.sender._id !== user._id && selectedChat.isGroupChat && (
        <div className={`${same ? "opacity-0" : "opacity-100"}`}>
          <Tooltip label={!same && el.sender.name}>
            <Avatar
              name={el.sender.name}
              cursor={!same ? "pointer" : "default"}
              src={el.sender.pic}
              size="sm"
            />
          </Tooltip>
        </div>
      )}
      <div
        className={`${
          el.sender._id !== user._id ? "bg-gray-800" : "bg-green-700"
        } text-white ${
          el.sender._id !== user._id ? "rounded-r-lg" : "rounded-l-lg"
        }  px-5 py-2`}
      >
        {el.sender._id !== user._id && !same && selectedChat.isGroupChat && (
          <p className="text-amber-600">{el.sender.name}</p>
        )}{" "}
        <p>
          {el.content}
          <span className="text-gray-300 ml-8">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SingleMessage;
