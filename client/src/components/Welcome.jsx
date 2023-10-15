import React from "react";
import { StrictMode, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
const Welcome = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "",
    agreed: false,
  });
  const navigate = useNavigate();
  const sendForm = async (error) => {
    error.preventDefault();
    const { name, email, password, number, gender } = data;
    if (data.agreed) {
      try {
        const { data } = await axios.post("/register", {
          name,
          email,
          password,
          number,
          gender,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Account Created Successfully");
          setData({
            name: "",
            email: "",
            number: "",
            password: "",
            gender: "",
            agreed: false,
          });
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Accept conditions.");
    }
  };
  return (
    <>
      <div className=" h-screen w-auto flex justify-center items-center   lg:flex-wrap">
        <div className="h-auto shadow-xl  border rounded-[30px] p-5 flex flex-row pt-5 pl-5  items-center justify-center iphone:flex-wrap 1 ">
          <img
            className="2xl:w-[25vw] h-[50vh] iphone:w-auto"
            draggable="false"
            src="https://img.freepik.com/premium-vector/global-network-connection-abstract-concept-vector-illustration_107173-25598.jpg?w=1480"
            alt=""
          />
          <form
            onSubmit={sendForm}
            className="flex flex-col p-5 pr-5 font-lato font-semilbold"
          >
            <h1 className="font-suez text-xl ">Create a new Account</h1>
            <div className="flex flex-row gap-3 ">
              <input
                type="text"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                placeholder="Full Name"
                className=" font-lato border-box mt-5 mb-2 border-b-2 border-black pb-1 p-2 focus:outline-none w-auto iphone:flex-grow"
              />
            </div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              placeholder="Email"
              className=" font-lato border-box mt-5 mb-5 border-b-2 border-black pb-1 p-2 focus:outline-none w-auto"
            />
            <input
              type="tel"
              value={data.number}
              onChange={(e) => {
                setData({ ...data, number: e.target.value });
              }}
              placeholder="Phone"
              className=" font-lato border-box mt-5 mb-5 border-b-2 border-black pb-1 p-2 focus:outline-none w-auto"
            />
            <div className="flex flex-col">
              <input
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                type="password"
                placeholder="Password"
                className=" font-lato border-box mt-5 mb-2 border-b-2 border-black p-2 focus:outline-none w-auto"
              />
            </div>
            <div className="flex flex-row gap-5 pl-2 mt-2">
              <p>Gender:</p>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={(e) => {
                    setData({ ...data, gender: e.target.value });
                  }}
                />
                <label>Male</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={(e) => {
                    setData({ ...data, gender: e.target.value });
                  }}
                />
                <label>Female</label>
              </div>
            </div>
            <div className="flex flex-row mt-2 gap-2">
              <input
                type="checkbox"
                onChange={() => {
                  setData({ ...data, agreed: !data.agreed });
                }}
                checked={data.agreed}
              />
              <p>I have read and agree to the Terms and Conditions</p>
            </div>
            <button
              className="mt-5 border p-3 rounded-xl bg-blue-400 text-white"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Welcome;
