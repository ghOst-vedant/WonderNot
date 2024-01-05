import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "src/redux";
import Post from "./Post";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const getPosts = async () => {
    const response = await axios.get("/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await axios.get(`/posts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts &&
        posts
          .toReversed()
          .map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              likes,
              comments,
              picturePath,
              userPicturePath,
            }) => (
              <Post
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                location={location}
                likes={likes}
                comments={comments}
              />
            )
          )}
    </>
  );
};

export default PostsWidget;
