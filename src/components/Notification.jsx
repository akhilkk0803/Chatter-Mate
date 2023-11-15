import React, { useContext, useState } from "react";
import { BellIcon } from "@chakra-ui/icons";
import { Usercontext } from "../usercontext";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const Notification = () => {
  const { notifications, user, setSelectedChat, setnotifications } =
    useContext(Usercontext);
  return (
    <div
      className="cursor-pointer relative flex "
      onClick={(prev) => setShowNotification(!prev)}
    >
      <>
        <Menu>
          <MenuButton
            as={Button}
            p={1}
            rightIcon={<BellIcon fontSize="2xl" />}
          />
          <MenuList>
            {notifications.length === 0 && "No new messages"}
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
                  {el.chat.isGroupChat
                    ? "New Message in " + el.chat.chatName
                    : "New message from " +
                      el.chat.user[
                        el.chat.user.findIndex((el) => el._id != user._id)
                      ].name}
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
