import React from "react";

const Post = (props) => {
  return (
    <div>
      <div className="flex flex-col border border-black rounded-lg py-2 px-4 gap-2 shadow-lg">
        <div className="flex p-4 items-center mr-4">
          <img
            className="h-16 w-16 mr-4 rounded-full border"
            src={props.userImg}
            alt="post_img"
          />
          <div>
            <h2 className="text-2xl font-bold">{props.userName}</h2>
            <p className="text-lg">{props.userTitle}</p>
          </div>
        </div>
        <div className="mr-4">
          <p className="text-2xl font-bold">{props.title}</p>
          <p className="text-xl text-justify">{props.description}</p>
          <img
            className="mx-auto my-4 w-[70%] rounded-xl"
            src={props.image}
            alt="post_img"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
