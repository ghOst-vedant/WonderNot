import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import { UserWidget } from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListing from "../widgets/FriendListing";
import Mentor from "../widgets/Mentor";
import Appointment from "../widgets/Appointment";

const HomePage = () => {
  const { _id, picturePath, isA } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        p={isNonMobileScreens ? "2rem 3%" : "2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"1.5rem"}
        justifyContent={"space-between"}
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          gap={"2rem"}
          display={"flex"}
          flexDirection={"column"}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
          {!isA && <Mentor />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <>
            <Box
              flexBasis={"30%"}
              gap={"2rem"}
              display={"flex"}
              flexDirection={"column"}
            >
              <FriendListing userId={_id} />
              <Appointment userId={_id} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
