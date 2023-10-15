import React from "react";

const Chats = (props) => {
  return (
    <div>
      <div className="flex flex-col border border-black rounded-xl py-2 px-4 gap-2">
        <div className="flex p-1 items-center cursor-pointer">
          <img
            className="h-16 w-16 mr-4 rounded-full border"
            src={props.userImg}
            alt="post_img"
          />
          <div>
            <p className="text-lg font-bold">{props.userName}</p>
            {/* <p className="text-lg">{props.userTitle}</p> */}
          </div>
        </div>
        {/* <p className="text-2xl font-bold">{props.title}</p>
        <p className="text-xl text-justify">{props.description}</p>
        <img
          className="mx-auto my-4 w-[70%] "
          src={props.image}
          alt="post_img"
        /> */}
      </div>
    </div>
  );
};

// export default Post;

export default Chats;
