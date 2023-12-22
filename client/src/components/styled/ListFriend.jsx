import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "src/redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const ListFriend = ({ friendId, name, userPicturePath }) => {
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const friendsArray = Object.values(friends);
  const isFriend = friendsArray.find((friend) => friend._id === friendId);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const friendRequest = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const patchFriend = async () => {
    try {
      const response = await toast.promise(friendRequest(token), {
        pending: "Updating Friends...",
        success: "Friends updated!!!",
        error: "Error adding friend. Please try again.",
      });
      dispatch(setFriends({ friends: response }));
    } catch (error) {
      console.log("====================================");
      console.log("Adding friend error: ", error);
      console.log("====================================");
    }
  };

  const getUser = async () => {
    if (friendId) {
      try {
        const response = await axios.get(`users/${friendId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data.skills;
        setSkills(data);
      } catch (error) {
        console.log("Error fetching User friends: "), error;
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FlexBetween gap="0.75rem">
          <UserImage image={userPicturePath} size="60px" />
          <Box
            alignSelf={"flex-start"}
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h6"
              fontWeight={"500"}
              fontSize={14}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            {/* {skill} or {location} */}

            {skills && (
              <Box
                ml={"0.25rem"}
                display={"flex"}
                flexWrap={"wrap"}
                gap={"0.35rem"}
              >
                {skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={{ fontSize: 11 }} />
                ))}
              </Box>
            )}
          </Box>
        </FlexBetween>
        {_id !== friendId && (
          <Box alignSelf={"flex-start"}>
            <IconButton
              onClick={patchFriend}
              sx={{
                backgroundColor: primaryLight,
                p: "0.75rem",
                "&:hover": {
                  backgroundColor: primaryLight,
                  boxShadow: `0 0px 6px ${palette.primary.light}}`,
                },
              }}
            >
              {isFriend ? (
                <PersonRemoveOutlined
                  sx={{
                    fontSize: `${isNonMobileScreens ? "18px" : "22px"}`,
                    color: primaryDark,
                  }}
                />
              ) : (
                <PersonAddOutlined
                  sx={{
                    color: primaryDark,
                  }}
                />
              )}
            </IconButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListFriend;
