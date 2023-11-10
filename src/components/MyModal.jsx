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
const MyModal = ({ children, user }) => {
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
          <Button onClick={onClose}>Close</Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyModal;
