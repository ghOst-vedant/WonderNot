import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import { UserWidget } from "../widgets/UserWidget";
import FriendListing from "../widgets/FriendListing";
const ProfilePage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        p={"2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"5rem"}
      >
        <Box
          // flexBasis={isNonMobileScreens ? "25%" : undefined}
          width={isNonMobileScreens ? "31%" : undefined}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          gap={"0rem"}
        >
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m={isNonMobileScreens ? "2rem" : "0"} ml={"0"}>
            <FriendListing userId={userId} />
          </Box>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "48%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m={isNonMobileScreens ? "0.5rem" : "0"}>
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
