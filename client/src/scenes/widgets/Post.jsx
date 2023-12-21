import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, IconButton, useTheme } from "@mui/material";
import FlexBetween from "src/components/styled/FlexBetween";
import Friend from "src/components/styled/Friend";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "src/redux";
import axios from "axios";
const Post = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  location,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await axios.patch(
      `http://wondernot.onrender.com/posts/${postId}/like`,
      { userId: loggedInUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    dispatch(setPost({ post: data }));
  };

  return (
    <>
      <WidgetWrapper m={"2rem 0"} display={"flex"} flexDirection={"column"}>
        {" "}
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ m: "1rem" }}>
          {" "}
          {description}{" "}
        </Typography>
        {picturePath && (
          <>
            {" "}
            <img
              width={"50%"}
              style={{
                borderRadius: "0.75rem",
                margin: "0.75rem",
                alignSelf: "center",
              }}
              src={`${picturePath}`}
              alt="post"
            />
          </>
        )}
        <FlexBetween mt={"0.25rem"}>
          <FlexBetween gap={"1rem"}>
            {/* Like section */}
            <FlexBetween gap={"0.3rem"}>
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
            {/* Comment Section */}
            {comments && (
              <FlexBetween gap={"0.3rem"}>
                <IconButton
                  onClick={() => {
                    setIsComments(!isComments);
                  }}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </FlexBetween>
            )}
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <>
            <Box mt={"0.5rem"}>
              {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          </>
        )}
      </WidgetWrapper>
    </>
  );
};
export default Post;
