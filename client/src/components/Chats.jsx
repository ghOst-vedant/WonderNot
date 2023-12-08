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
            <p className="text-lg font-montserrat">{props.userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Post;

export default Chats;
