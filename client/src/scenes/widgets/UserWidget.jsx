import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  School,
  Stars,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Chip,
  Button,
  Dialog,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import UserImage from "components/styled/UserImage";
import FlexBetween from "components/styled/FlexBetween";
import WidgetWrapper from "components/styled/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleConfirmSlot = () => {
    // Handle the selected date here, e.g., send it to the backend
    console.log("Selected Date:", selectedDate);
    handleCloseModal();
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
              {" "}
              {location}{" "}
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
              {" "}
              {isA}{" "}
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
                  <Box py="0.7rem">
                    <Button
                      onClick={handleSlot}
                      sx={{
                        fontSize: 13,
                        color: palette.primary.main,
                        borderRadius: "2rem",
                        p: "0.5rem 1.5rem",
                      }}
                    >
                      Book A Session
                    </Button>
                  </Box>
                  <Dialog open={isModalOpen} onClose={handleCloseModal}>
                    <Box
                      p={"2rem 2rem"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Typography
                        pb={"0.5rem"}
                        variant="h5"
                        alignSelf={"flex-start"}
                      >
                        Appointment Slot with Mentor
                      </Typography>
                      <Divider sx={{ mb: "0.5rem" }} />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DateTimePicker label="Date and Time" />
                        </DemoContainer>
                      </LocalizationProvider>

                      <Button
                        sx={{
                          mt: "0.85rem",
                          border: `1px solid ${palette.primary.light}`,
                          fontSize: 13,
                          color: medium,
                          borderRadius: "2rem",
                          p: "0.5rem 1.5rem",
                          "&:hover": {
                            bgcolor: palette.primary.main,
                            color: "white",
                            cursor: "pointer",
                            boxShadow: `0 0px 6px ${palette.primary.light}}`,
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
