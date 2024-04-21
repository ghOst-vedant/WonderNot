import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  School,
  Stars,
  CalendarToday,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Chip,
  Button,
  Dialog,
  InputBase,
} from "@mui/material";

import UserImage from "components/styled/UserImage";
import FlexBetween from "components/styled/FlexBetween";
import WidgetWrapper from "components/styled/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

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

  const handleSlot = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const {
    firstName,
    lastName,
    skills,
    friends,
    location,
    rating,
    isA,
    mentorSkills,
  } = user;
  const handleAppointment = async () => {
    try {
      await toast.promise(createRequest(description, token), {
        pending: "Sending Request...",
        success: "Requested successfully!",
        error: "Error creating request. Please try again later.",
      });
      setDescription();
      handleCloseModal();
    } catch (error) {
      console.error("Error requesting Appointment" + error);
    }
  };
  const createRequest = async (description, token) => {
    try {
      const message = { description: description };
      const response = await axios.post(
        `/users/${_id}/appointment/${userId}`,
        message,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <WidgetWrapper>
        <FlexBetween
          gap="0.75rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h5"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {" "}
                {firstName} {lastName}{" "}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
        <Divider sx={{ width: "100%" }} />
        {/* Second Row */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={"1rem 0"}
          gap={"0.25rem"}
        >
          <Box
            display={"flex"}
            gap={"1rem"}
            alignItems={"center"}
            justifyItems={"baseline"}
            mb={"0.5rem"}
          >
            <LocationOnOutlined fontSize={"medium"} sx={{ color: main }} />
            <Typography color={medium} fontSize={"medium"}>
              {location}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            gap={"1rem"}
            alignItems={"center"}
            justifyItems={"baseline"}
            mb={"0.5rem"}
          >
            {isA && <School fontSize={"medium"} sx={{ color: main }} />}

            <Typography color={medium} fontSize={"medium"}>
              {isA}
            </Typography>
          </Box>
          {/* SKills part */}
          <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
              <WorkOutlineOutlined fontSize={"medium"} sx={{ color: main }} />
              <Typography color={medium} fontSize={"medium"}>
                Skills:
              </Typography>
            </Box>
            <Box ml={"0.25rem"} display={"flex"} gap={"0.5rem"} p={"0.75rem"}>
              {skills.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ fontSize: "small" }} />
              ))}
            </Box>
          </Box>
          {isA && (
            <>
              <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
                  <WorkOutlineOutlined
                    fontSize={"medium"}
                    sx={{ color: main }}
                  />
                  <Typography color={medium} fontSize={"medium"}>
                    {" "}
                    Available for Mentoring:
                  </Typography>
                </Box>
                <Box
                  ml={"0.25rem"}
                  display={"flex"}
                  gap={"0.5rem"}
                  p={"0.75rem"}
                >
                  {mentorSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{ fontSize: "small" }}
                    />
                  ))}
                </Box>
              </Box>
              {userId !== _id && (
                <>
                  <Box
                    py="0.7rem"
                    onClick={handleSlot}
                    display={"flex"}
                    sx={{
                      width: "fit-content",
                      userSelect: "none",
                      fontSize: 13,
                      color: palette.primary.dark,
                      border: `1px solid ${palette.primary.main}`,
                      borderColor: palette.primary.light,
                      borderRadius: "0.7rem",
                      p: "0.75rem 1.25rem",
                      "&:hover": {
                        backgroundColor: palette.primary.main,
                        color: palette.background.default,
                        borderColor: palette.background.default,
                      },
                    }}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={"0.4rem"}>
                      <CalendarToday />
                      <Box>Book A Session</Box>
                    </Box>
                  </Box>

                  <Dialog open={isModalOpen} onClose={handleCloseModal}>
                    <Box
                      p={"2rem 2rem"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Typography
                        pb={"0.5rem"}
                        px={"0.75rem"}
                        variant="h5"
                        alignSelf={"flex-start"}
                      >
                        Request Appointment Slot with Mentor
                      </Typography>
                      <Divider
                        sx={{ mb: "0.5rem", bgcolor: palette.neutral.medium }}
                      />
                      <InputBase
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripe Your Queries and Purpose"
                        sx={{
                          width: "100%",
                          mt: "0.7rem",
                          bgcolor: palette.neutral.light,
                          borderRadius: "0.7rem",
                          p: "0.9rem 0.7rem",
                          lineHeight: "1.5rem",
                        }}
                      />
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DateTimePicker label="Date and Time" />
                        </DemoContainer>
                      </LocalizationProvider> */}
                      <Button
                        onClick={handleAppointment}
                        sx={{
                          alignSelf: "center",
                          width: "40%",
                          mt: "1rem",
                          fontSize: 13,
                          color: palette.primary.dark,
                          border: `1px solid ${palette.primary.main}`,
                          borderColor: palette.primary.light,
                          borderRadius: "0.7rem",
                          p: "0.5rem 0.75rem",
                          "&:hover": {
                            backgroundColor: palette.primary.main,
                            color: palette.background.default,
                            borderColor: palette.background.default,
                          },
                        }}
                      >
                        Book
                      </Button>
                    </Box>
                  </Dialog>
                </>
              )}
              <Box
                display={"flex"}
                gap={"1rem"}
                alignItems={"center"}
                justifyItems={"baseline"}
                mb={"0.5rem"}
              >
                <Stars fontSize={"medium"} sx={{ color: main }} />
                <Typography color={medium} fontSize={"medium"}>
                  {rating}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </WidgetWrapper>
    </>
  );
};
