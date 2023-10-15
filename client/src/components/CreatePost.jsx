import React, { useState } from "react";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as sending data to an API or storing it in state.
    console.log("Form submitted:", postData);
    // Reset the form fields after submission
    setPostData({ title: "", description: "", image: "" });
  };

  return (
    <div className="absolute top-[40%] left-[40%]">
      <form
        onSubmit={handleSubmit}
        className="border absolute top-[40%] left-[45%] bg-blue-100 p-4 rounded-xl flex flex-col gap-2"
      >
        {/* <button className=" rotate-45 h-5 w-5 absolute ">+</button> */}
        <input
          // value={data.password}
          type="text"
          placeholder="Title"
          className=" font-lato border-box mt-5 mb-2 border-b-2 rounded-lg  border-black p-2 focus:outline-none w-auto"
        />

        <input
          // value={data.password}
          type="text"
          placeholder="Description"
          className=" font-lato border-box mt-5 mb-2 border-b-2 rounded-lg  border-black p-2 focus:outline-none w-auto"
        />

        <input
          // value={data.password}
          type="file"
          placeholder="Image Url"
          className=" font-lato border-box mt-5 mb-2  border-black p-2 focus:outline-none w-auto"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
