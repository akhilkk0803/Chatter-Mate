import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chats");
    }
  }, []);
  return (
    <div className="items-center justify-center min-h-screen flex ">
      <Container maxW="xl">
        {" "}
        <div className="flex  gap-3 flex-col ml-0 mr-0 items-center m-auto justify-center p-4">
          <div className="bg-white p-4 w-full text-center rounded-xl text-3xl">
            Chatter-Mate
          </div>
          <div className="bg-white p-4 w-full rounded-xl ">
            <Tabs variant="soft-rounded">
              <TabList mb={2}>
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Signup</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>{<Login />}</TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
