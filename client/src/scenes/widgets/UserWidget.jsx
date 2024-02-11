import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  Person,
  School,
  Stars,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Chip } from "@mui/material";

import UserImage from "components/styled/UserImage";
import FlexBetween from "components/styled/FlexBetween";
import WidgetWrapper from "components/styled/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
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
            </>
          )}
        </Box>
        <Box></Box>
      </WidgetWrapper>
    </>
  );
};
