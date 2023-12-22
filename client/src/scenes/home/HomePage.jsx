import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import { UserWidget } from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListing from "../widgets/FriendListing";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
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
            <Box flexBasis={"30%"}>
              <FriendListing userId={_id} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
