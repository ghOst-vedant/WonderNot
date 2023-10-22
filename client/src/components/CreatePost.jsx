import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";
const CreatePost = ({ onClose }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    userOwner: user.userID,
  });

  const [show, setshow] = useState(true);
  const showCreatePost = () => {
    if (show === true) {
      setshow(false);
    }
  };
  // Handle the state changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    // You can handle the form submission logic here, such as sending data to an API or storing it in state.
    try {
      await axios.post("/post", postData);

      setPostData({});
      navigate("/home");
      onClose();
      toast.success("Post Created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="modal bg-white p-3 rounded-xl shadow-xl border	">
        <div className=" bg-blue-200 p-10 rounded-xl shadow-xl border border-black backdrop-blur-sm">
          <button
            className="absolute left-[32vw] border border-black rounded px-2"
            onClick={onClose}
          >
            Close
          </button>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-2 p-5">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="rounded-xl px-2 py-2 w-[30vw] font-bold"
            />
            <label for="title">Description</label>
            <textarea
              type="textarea"
              name="description"
              className="rounded-xl px-2 py-1 w-[30vw] border"
              onChange={handleChange}
            />
            <label for="image">ImageUrl</label>
            <input
              type="text"
              name="imageUrl"
              className="rounded-xl px-2 py-2 w-[30vw] border-box   border-b-2"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
