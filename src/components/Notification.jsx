import React, { useContext, useState } from "react";
import { BellIcon } from "@chakra-ui/icons";
import { Usercontext } from "../usercontext";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const Notification = () => {
  const { notifications, user, setSelectedChat, setnotifications } =
    useContext(Usercontext);
  return (
    <div className="cursor-pointer relative flex ">
      <>
        <Menu>
          <MenuButton
            as={Button}
            p={1}
            rightIcon={<BellIcon fontSize="2xl" />}
          />
          {notifications.length > 0 && (
            <span className="bg-red-600 absolute -right-2 -top-2 px-2 rounded-full">
              {notifications.length}
            </span>
          )}{" "}
          <MenuList zIndex={1}>
            {notifications.length === 0 && (
              <p className=" bg-white text-green-600 z-100">No new messages</p>
            )}
            {notifications.length > 0 &&
              notifications.map((el) => (
                <MenuItem
                  key={el._id}
                  onClick={() => {
                    setSelectedChat(el.chat);
                    setnotifications(
                      notifications.filter((noti) => noti._id != el._id)
                    );
                  }}
                >
                  <p className="text-red-500">
                    {el.chat.isGroupChat
                      ? "New Message in " + el.chat.chatName
                      : "New message from " +
                        el.chat.user[
                          el.chat.user.findIndex((el) => el._id != user._id)
                        ].name}
                  </p>
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        `
      </>
    </div>
  );
};

export default Notification;
