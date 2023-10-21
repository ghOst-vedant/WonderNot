import React, { useState } from "react";
import info from "../components/info.json";
import Post from "../components/Post.jsx";
import Chats from "./Chats";
import CreatePost from "../components/CreatePost";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
const users = [
  {
    id: "1",
    userImg:
      "https://tse3.mm.bing.net/th?id=OIP.qFFYq8fnGSy1hb2VICyVAgHaG0&pid=Api&P=0&h=180",
    userName: "Alex Tharian",
  },
  {
    id: "2",
    userImg:
      "https://tse3.mm.bing.net/th?id=OIP.kcaJsnMsMsFRdU6d1m2v6AHaHa&pid=Api&P=0&h=180",
    userName: "Aniket Sahu",
  },
  {
    id: "3",
    userImg:
      "https://tse2.mm.bing.net/th?id=OIP.fYA3SDtXsC0ifoDgr5M82gHaGg&pid=Api&P=0&h=180",
    userName: "Roshni",
  },
  {
    id: "4",
    userImg:
      "https://tse4.mm.bing.net/th?id=OIP.Y04Jkg_VJQLs-PV7Itca-QHaHa&pid=Api&P=0&h=180",
    userName: "Sunidhi Munshi",
  },
  {
    id: "5",
    userImg:
      "https://tse1.mm.bing.net/th?id=OIP.o83SBJamk7HF3wy2XTaaMwHaJO&pid=Api&P=0&h=180",
    userName: "Divyakshi Tare",
  },
];

const Home = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const user = useSelector(selectUser);

  console.log(user);
  return (
    <>
      <div className="flex flex-row gap-3 w-full h-[90vh] px-10 py-2 box-border justify-center ">
        {showCreateForm && <CreatePost />}
        {/* User section */}
        <div className=" text-5xl w-[20vw] border flex flex-col items-center shadow-xl h-[60vh] rounded-lg mt-2 px-5">
          <img
            className="w-[10vw] border border-black rounded-full mt-2"
            src="https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_1280.png"
            alt="as"
          />
          <h1 className=" text-2xl font-semilbold m-2 mb-5">
            Hello, {user?.userName}{" "}
          </h1>
          <div className="flex flex-col justify-normal text-xl font-semilbold border border-black rounded-md p-5">
            <p className=" font-lato border-box mb-5 border-b-2 border-black pb-1 focus:outline-none w-auto">
              Skills
            </p>
            <ul className="px-5">
              <li className="list-disc">Web Development</li>
              <li className="list-disc">Android Development</li>
              <li className="list-disc">skill-c</li>
            </ul>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowCreateForm(!showCreateForm);
            }}
          >
            <button className="p-2 ">+</button>
            <p className="text-3xl mt-2">Create Post</p>
          </div>
        </div>
        {/* Central pos vala section */}
        <div className="p-5 text-5xl flex-1  overflow-scroll h-[100%] mt-2">
          <div className="flex flex-col gap-4">
            {info.map((el) => (
              <Post
                key={el._id}
                userImg={el.userImg}
                userName={el.userName}
                userTitle={el.userTitle}
                title={el.title}
                description={el.description}
                image={el.image}
              />
            ))}
          </div>
        </div>

        {/* Chat rigt vala section */}
        <div className=" text-5xl w-[20vw]  flex flex-col items-normal">
          <div className="flex flex-col justify-normal text-xl font-semilbold border border-black rounded-md p-5 mt-2">
            <p className=" font-lato border-box mb-5 border-b-2 border-black pb-1 focus:outline-none w-auto">
              Chats
            </p>
            <div className="flex flex-col gap-4">
              {users.map((el) => (
                <Chats
                  key={el._id}
                  userImg={el.userImg}
                  userName={el.userName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
