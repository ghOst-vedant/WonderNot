import { Badge, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const Convo = ({ data, currentUserId, online }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

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
  }, [data]);
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
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage
            image={userData?.picturePath}
            size={isNonMobileScreens ? "55px" : "45px"}
          />
          <Box>
            <Typography color={main} variant="h5" fontWeight="500">
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <Box color={"greenyellow"} fontSize="0.75rem">
              {online && <Typography fontSize={"0.7rem"}>Online</Typography>}
            </Box>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default Convo;
