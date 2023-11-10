import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { url } from "../../../url";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState(undefined);
  const [email, setemail] = useState(undefined);
  const [password, setpassword] = useState(undefined);
  const [show, setshow] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [pic, setpic] = useState(undefined);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [confirmpassword, setconfirmpassword] = useState("");
  function submithandler() {
    if (pic === undefined) {
      toast({
        title: "Please upload an image for your profile",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (!name || !email || !password) {
      toast({
        title: "Fill all details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (password != confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const data = {
      name,
      email,
      password,
      pic,
    };
    fetch(url + "/user/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          toast({
            title: "User already exsist",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        toast({
          title: "Successfully signed up",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("token", data.token);
        console.log(data);
        navigate("/chats");
      })
      .catch((err) => console.log(err));
  }
  const uploadImage = () => {
    const Imageurl = "https://api.cloudinary.com/v1_1/daq6fi6pe/image/upload";
    if (pic === undefined) {
      console.log("first");
      toast({
        title: "Please select an image",
        description: "Select an image for your profile",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg" ||
      pic.type === "image/svg"
    ) {
      console.log("first");
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      setloading(true);
      fetch(Imageurl, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url.toString());
          setpic(data.url.toString());
          setloading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightAddon>
            <Button size="sm" onClick={() => setshow((prev) => !prev)}>
              {" "}
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl isRequired id="confirmpassword">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            value={confirmpassword}
            type={confirm ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <InputRightAddon>
            <Button size="sm" onClick={() => setconfirm((prev) => !prev)}>
              {" "}
              {confirm ? "Hide" : "Show"}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel> Upload your picture</FormLabel>
        <InputGroup>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => setpic(e.target.files[0])}
          />
          <InputRightAddon>
            <Button onClick={uploadImage}>Upload</Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" onClick={submithandler} isLoading={loading}>
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;
