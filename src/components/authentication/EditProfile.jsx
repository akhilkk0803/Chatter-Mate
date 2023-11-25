import React, { useContext, useEffect } from "react";
import { Usercontext } from "../../usercontext";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const EditProfile = () => {
  const { user, setuser } = useContext(Usercontext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <div
      className="min-h-screen flex items-center 
    justify-center  "
    >
      <div className="bg-white p-5 rounded-lg">
        <p className="text-3xl text-center">Edit Profile </p>
        <Signup edit={true} />
      </div>
    </div>
  );
};

export default EditProfile;
