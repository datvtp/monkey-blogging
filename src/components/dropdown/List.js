import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute max-h-[200px] overflow-y-auto scroll-smooth top-full left-0 w-full bg-white border-2 border-greyf1 rounded-lg mt-1 shadow-sm z-50">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
