import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const GroupMembers = ({ el, deletemember, canDelete = true }) => {
  return (
    <div className="bg-fuchsia-600 px-4 py-2  text-white   rounded-2xl">
      <div>
        {el.name}
        {canDelete && (
          <span className="ml-2 cursor-pointer">
            <CloseIcon w={3} onClick={() => deletemember(el._id || el.id)} />
          </span>
        )}
      </div>
    </div>
  );
};

export default GroupMembers;
