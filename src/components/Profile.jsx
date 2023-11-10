import React, { useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  Button,
  Avatar,
  MenuList,
} from "@chakra-ui/react";
import { Usercontext } from "../usercontext";
import MyModal from "./MyModal";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(Usercontext);
  function logouthandler() {
    localStorage.removeItem("token");
    setuser(null);
    navigate("/");
  }
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Avatar src={user?.pic} size="sm" cursor="pointer" />
      </MenuButton>
      <MenuList>
        <MyModal user={user}>
          <MenuItem>My Profile</MenuItem>
        </MyModal>
        <MenuItem onClick={logouthandler}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
