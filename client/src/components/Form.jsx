import React, { StrictMode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { GrGoogle, GrApple } from "react-icons/gr";
import child from "../Assets/kid 1.png";
import { useDispatch } from "react-redux";
import "././../../src/";
import { login } from "../redux/features/userSlice.js";
const Form = () => {
  // ismai saare entries ayenge
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // function on submission where the new entry is created and the allEntry state is updated
  const submitForm = async (error) => {
    error.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Login Successful");
        setData({});
        setCookie("access_token", data.token);
        const userData = {
          userID: data.userID,
          userName: data.userName,
          userEmail: data.userEmail,
          userGender: data.userGender,
          userContact: data.userContact,
        };
        dispatch(login(userData));
        // localStorage.setItem("userData", userID);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StrictMode>
      <div className="fixed h-[100vh]">
        <div className="shadow-xl absolute top-[20vh] left-[30.34vw] rounded-[30px]   border  w-[41.36vw] h-[62vh] bg-white ">
          <form
            action=""
            onSubmit={submitForm}
            className="flex flex-col absolute  justify-items-end ml-[4.76vw] mt-[4.80vh]"
          >
            <h1 className="text-3xl font-suez">Login</h1>
            <h4 className="font-montserrat text-black/60 font-semilbold">
              Enter account details
            </h4>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              className="font-montserrat border-box mt-[5vh] mb-3 border-b-2 border-black p-2 focus:outline-none w-[18.75vw]"
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              className=" font-montserrat mt-5 mb-2 border-b-2 border-black  p-2 focus:outline-none  w-[18.75vw]"
            />
            <a
              href="#"
              className="font-montserrat font-bold text-black/50  ml-3 mt-2"
            >
              Forgot password?
            </a>
            <button className="font-montserrat font-semilbold rounded-lg bg-blue-one p-2 w-[13.39vw] mt-3 text-white m-auto ">
              Login
            </button>
            <div className="flex flex-row items-center mt-5">
              <hr className="  w-[5.5vw] border-t border-black/40 " />
              <h4 className="  font-montserrat font-semilbold text-black/60 px-2">
                Or continue with
              </h4>
              <hr className="  w-[5.5vw] border-t border-black/40 " />
            </div>
          </form>
          <div className="absolute flex flex-row gap-6 top-[47.0vh] left-[11.54vw] justify-center items-center mt-5">
            <GrGoogle size={30} color="#1A405F" />
            <GrApple size={31} color="#1A405F" />
          </div>
          <span className="absolute top-[55.88vh] ml-[4.76vw] font-montserrat  text-black/50 font-semilbold text-sm">
            Dont have an account?{" "}
            <Link to="/register" className="text-blue-two text-base">
              Signup
            </Link>
          </span>
        </div>
        <div className="absolute border-none h-[62vh] top-[20vh] left-[59vw] w-[17.26vw] bg-blue-two rounded-r-[30px]">
          <img
            src={child}
            alt="child"
            className="absolute top-[8.80vh] left-[5.6vw] w-[40vw] h-[42.99vh]"
          />
          <hr className=" absolute w-[10.35vw] border-t border-white top-[50.25vh]  left-[6.20vw]" />
        </div>
      </div>
    </StrictMode>
  );
};

export default Form;
