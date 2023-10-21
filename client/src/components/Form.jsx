import React, { StrictMode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { GrGoogle, GrApple } from "react-icons/gr";
import child from "../Assets/kid 1.png";
import { useDispatch } from "react-redux";
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
            <h4 className=" font-lato text-black/60 font-semilbold">
              Enter account details
            </h4>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              className=" font-lato border-box mt-[5vh] mb-3 border-b-2 border-black p-2 focus:outline-none w-[18.75vw]"
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              className=" font-lato mt-5 mb-2 border-b-2 border-black  p-2 focus:outline-none  w-[18.75vw]"
            />
            <a
              href="#"
              className="font-lato font-bold text-black/50  ml-3 mt-2"
            >
              Forgot password?
            </a>
            <button className="font-lato font-semilbold rounded-lg bg-blue-one p-2 w-[13.39vw] mt-6 text-white m-auto ">
              Login
            </button>
          </form>
          <hr className=" absolute w-[5.35vw] border-t border-black/60 top-[45.90vh] left-[4.76vw] " />
          <h4 className="absolute top-[44.44vh] left-[10.59vw] font-lato font-semilbold text-black/60">
            Or continue with
          </h4>
          <hr className=" absolute w-[5.35vw] border-t border-black/60 top-[45.90vh]  left-[18.20vw]" />
          <div className="absolute flex flex-row gap-6 top-[47.0vh] left-[11.54vw] justify-center items-center mt-3">
            <GrGoogle size={30} color="#1A405F" />
            <GrApple size={31} color="#1A405F" />
          </div>
          <a
            href=""
            className="absolute top-[55.88vh] ml-[4.76vw] font-lato  text-black/50 font-semilbold"
          >
            Don’t have an account?
          </a>
          <Link
            to="/register"
            className="absolute top-[55.88vh] ml-[16.5vw] font-lato  text-blue-one/100 font-semilbold"
          >
            SignUp
          </Link>
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
