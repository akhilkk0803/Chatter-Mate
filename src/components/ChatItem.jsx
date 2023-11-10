import { Avatar } from "@chakra-ui/react";
import React, { useContext } from "react";

const ChatItem = ({ el, onclick }) => {
  return (
    <div
      onClick={() => onclick(el._id,el.name)}
      className="flex gap-2 bg-gray-200 rounded-2xl p-4 hover:bg-cyan-500 cursor-pointer"
    >
      <div>
        <Avatar src={el.pic} />
      </div>
      <div>
        <p>{el.name}</p>
        <p>
          <span className="font-semibold">Email:</span>
          {el.email}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
