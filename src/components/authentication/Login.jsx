import {
  FormControl,
  Input,
  InputRightAddon,
  FormLabel,
  InputGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { url } from "../../../url";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState(undefined);
  const [password, setpassword] = useState(undefined);
  const [show, setshow] = useState(false);
  const toast = useToast();
  function submithandler() {
    if (!email || !password) {
      toast({
        title: "Fill all details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setloading(true);
    fetch(url + "/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {

        if (data.status === 404) {
          toast({
            title: "No user exsist with this email",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          throw new Error();
        } else if (data.status === 401) {
          toast({
            title: "Please check your email and password",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          throw new Error();
        } else return data.json();
      })
      .then((data) => {
        toast({
          title: "Succesfully logged in",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("token", data.token);
        navigate("/chats");
      })
      .catch((err) => setloading(false));
  }

  return (
    <div className="flex flex-col gap-5">
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
      </FormControl>{" "}
      <Button
        colorScheme="blue"
        isLoading={loading}
        variant="solid"
        onClick={submithandler}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
