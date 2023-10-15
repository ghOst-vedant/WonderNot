import React from "react";
import { HashLink } from "react-router-hash-link";
// import { Navigate } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <div className="h-[10vh] w-auto bg-blue-two">
        <div className="text-white flex flex-row justify-between items-center p-3">
          <div className="font-lato font-semibold text-2xl">WonderNot</div>
          <div className="flex flex-row items-baseline font-lato font-xl text-2xl">
            <input
              type="text"
              placeholder="What's in your mind"
              className="text-lg p-2 rounded-full w-[30vw] text-black	pl-4"
            />
            <HashLink to={"/home"} className="p-3">
              Home
            </HashLink>
            <HashLink to={"/profile"} className="p-3">
              Contact
            </HashLink>
            <HashLink
              to={"/login"}
              className="border pl-3 pr-3 pt-1 pb-2 rounded-lg"
            >
              <button>login</button>
            </HashLink>
            {/* <HashLink to={""}>Brands</HashLink>
            <HashLink to={""}>Services</HashLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
