import { Button, Image, MenuItem, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Usercontext } from "../usercontext";
import { NavLink } from "react-router-dom";
const MyModal = ({ children, user, edit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen} variant="text">
        {" "}
        {children}
      </Button>
      <Modal isOpen={isOpen} size="lg" isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader textAlign="center">{user?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Image
              boxSize="200px"
              objectFit="cover"
              src={user?.pic}
              alt="Profile Pic"
            />
            <p className="text-2xl">Email: {user?.email} </p>
          </ModalBody>
          {edit && (
            <Button mb={2} colorScheme="red">
              <NavLink className="w-full" to="/edit">
                Edit
              </NavLink>
            </Button>
          )}{" "}
          <Button onClick={onClose} colorScheme="blue">
            Close
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyModal;
