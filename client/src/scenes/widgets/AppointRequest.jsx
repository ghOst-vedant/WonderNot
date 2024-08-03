import { Label, Palette } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  InputBase,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "src/components/styled/UserImage";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import FlexBetween from "src/components/styled/FlexBetween";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import toast from "react-hot-toast";
const AppointRequest = ({ sender, message, requestId }) => {
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const handleCalendar = (newValue) => {
    if (moment(newValue).isValid()) {
      const formattedDate = moment(newValue).format("h:mm A, D MMMM, YYYY");
      setCalendar(formattedDate);
    } else {
      console.error("Invalid date format");
    }
  };
  const handleSlot = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //   getting the user who created the appointment request
  const getUser = async () => {
    const response = await axios.get(`/users/${sender}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Rejecting the Request
  const handleRejectAppointment = async () => {
    try {
      await toast.promise(rejectRequest(requestId, token), {
        pending: "Rejecting Request...",
        success: "Rejected successfully!",
        error: "Error creating request. Please try again later.",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error requesting Appointment" + error);
    }
  };
  const rejectRequest = async (requestId, token) => {
    try {
      await axios.delete(`/users/appointment/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  // Accepting the Request
  const handleAcceptAppointment = async () => {
    handleCalendar();
    try {
      await toast.promise(acceptRequest(requestId, token), {
        pending: "Accepting Request...",
        success: "Accepted successfully!",
        error: "Error creating request. Please try again later.",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error requesting Appointment" + error);
    }
  };

  const acceptRequest = async (requestId, token) => {
    try {
      const response = await axios.post(
        `/users/${_id}/acceptappointment/${requestId}/${sender}`,
        {
          date: calendar,
          meetingLink: meetingLink,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <FlexBetween py={"0.5rem"} my={"0.5rem"}>
        <Box display={"flex"} alignItems={"center"} gap={"0.75rem"}>
          <UserImage image={user.picturePath} />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography alignSelf={"flex-start"}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>{user.location}</Typography>
          </Box>
        </Box>
        <MapsUgcIcon sx={{ fontSize: "25px" }} onClick={handleSlot} />
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <Box
            p={"1.25rem 1.25rem"}
            display={"flex"}
            flexDirection={"column"}
            gap={"0.5rem"}
          >
            <Typography variant="h5">
              {user.firstName} {user.lastName} has requested for a Mentor
              Session
            </Typography>
            <Divider
              sx={{
                width: "80%",
                alignSelf: "center",
                bgcolor: palette.neutral.medium,
              }}
            />
            <Box
              mt={"1rem"}
              px={"1.25rem"}
              py={"1rem"}
              bgcolor={palette.background.default}
              borderRadius={"0.5rem"}
            >
              <Typography>{message}</Typography>
            </Box>
            <Box
              mt={"0.25rem"}
              alignSelf={"center"}
              display={"flex"}
              gap={"3.3rem"}
              width={"100%"}
              px={"0.5rem"}
              alignItems={"center"}
            >
              <Typography fontSize={"1rem"}>Alot a Session Time:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DateTimePicker
                    label="Session Date & Time"
                    onChange={(newValue) => handleCalendar(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"6.5rem"}
              px={"0.5rem"}
            >
              <Typography variant="h5">Meeting Link:</Typography>
              <TextField
                value={meetingLink}
                label="Place the Meeting Link Here"
                onChange={(e) => setMeetingLink(e.target.value)}
                sx={{
                  width: "50%",
                  borderRadius: "1.25rem",
                  mt: "0.75rem",
                }}
              />
            </Box>
            <Box
              display={"flex"}
              gap={"4rem"}
              px={"0.5rem"}
              alignSelf={"center"}
              mt={"0.75rem"}
            >
              <Box
                borderRadius={"0.8rem"}
                sx={{
                  width: "fit-content",
                  userSelect: "none",
                  fontSize: 13,
                  color: palette.primary.dark,
                  border: `1px solid ${palette.primary.main}`,
                  borderColor: palette.primary.light,
                  borderRadius: "0.7rem",
                  p: "0.5rem 1.25rem",
                  "&:hover": {
                    backgroundColor: "#EF4040",
                    color: palette.background.alt,
                    borderColor: palette.background.default,
                  },
                }}
                onClick={handleRejectAppointment}
              >
                Reject
              </Box>
              <Box
                sx={{
                  width: "fit-content",
                  userSelect: "none",
                  fontSize: 14,
                  color: palette.primary.dark,
                  border: `1px solid ${palette.primary.main}`,
                  borderColor: palette.primary.light,
                  borderRadius: "0.7rem",
                  p: "0.5rem 1.25rem",
                  "&:hover": {
                    backgroundColor: "#9ADE7B",
                    color: palette.background.default,
                    borderColor: palette.background.alt,
                  },
                }}
                onClick={handleAcceptAppointment}
              >
                Accept
              </Box>
            </Box>
          </Box>
        </Dialog>
      </FlexBetween>
    </>
  );
};

export default AppointRequest;
