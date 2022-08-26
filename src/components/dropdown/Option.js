import React from "react";

import { useDropdown } from "./dropdown-context";

const Option = ({ onClick, children }) => {
  const { setShow } = useDropdown();

  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };

  return (
    <div
      className="py-[15px] px-[25px] cursor-pointer flex items-center justify-between hover:text-primary transition-all"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Option;
