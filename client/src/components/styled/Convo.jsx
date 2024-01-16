import { Badge, Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "src/redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const Convo = ({ data, currentUserId, online }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);
  const [userData, setUserData] = useState(null);
  const userId = data.members.find((id) => id !== currentUserId);
  const getUser = async () => {
    const response = await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Box
      padding={"0.5rem 0rem"}
      pl={"0.5rem"}
      sx={{
        "&:hover": {
          cursor: "pointer",
          bgcolor: palette.background.default,
          borderRadius: "1rem",
        },
      }}
    >
      <Badge variant="dot" color="green">
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={userData?.picturePath} size="55px" />
            <Box>
              <Typography color={main} variant="h5" fontWeight="500">
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                Online
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Badge>
    </Box>
  );
};

export default Convo;
