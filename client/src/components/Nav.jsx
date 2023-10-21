import React from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import { Link, Link } from "react-router-hash-link";
// import { Navigate } from "react-router-dom";
const Nav = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userData");
  };
  // console.log(cookies.access_token);
  return (
    <>
      <div className="h-[10vh] w-auto bg-blue-two">
        <div className="text-white flex flex-row justify-between items-center p-3">
          {cookies.access_token ? (
            <Link to={"/home"}>
              <h1 className="font-lato font-semibold text-2xl">WonderNot</h1>
            </Link>
          ) : (
            <Link to={"/login"}>
              <h1 className="font-lato font-semibold text-2xl">WonderNot</h1>
            </Link>
          )}
          <div className="flex flex-row items-baseline font-lato font-xl text-2xl gap-2">
            {cookies.access_token ? (
              <>
                <input
                  type="text"
                  placeholder="What's in your mind"
                  className="text-lg p-2 rounded-full w-[30vw] text-black	pl-4"
                />
                <Link to={"/home"} className="p-3">
                  Home
                </Link>
                <Link to={"/profile"} className="p-3">
                  Contact
                </Link>
                <Link
                  to={"/login"}
                  className="border pl-3 pr-3 pt-1 pb-2 rounded-lg"
                >
                  <button onClick={logout}>logout</button>
                </Link>
              </>
            ) : (
              <Link
                to={"/login"}
                className="border pl-3 pr-3 pt-1 pb-2 rounded-lg"
              >
                <button>login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
