import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import { UserWidget } from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListing from "../widgets/FriendListing";
import Mentor from "../widgets/Mentor";
import Appointment from "../widgets/Appointment";
import axios from "axios";
import { setAppointments } from "src/redux";

const HomePage = () => {
  const { _id, picturePath, isA } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const getAppointment = async () => {
    try {
      const response = await axios.get(`/users/${_id}/appointment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      dispatch(
        setAppointments({
          appointments: data.appointment,
        })
      );
    } catch (error) {
      console.error("Error Fetching Appointments: ", error);
    }
  };
  useEffect(() => {
    getAppointment();
  }, []);
  const appointments = useSelector((state) => state.appointments);
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
              {isA && appointments.length > 0 && (
                <Appointment userId={_id} UserAppointments={appointments} />
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
