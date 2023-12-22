import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "src/redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import toast from "react-hot-toast";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const friendsArray = friends && Object.values(friends);
  const isFriend =
    friendsArray && friendsArray.find((friend) => friend._id === friendId);

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

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="65px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
            "&:hover": {
              bgcolor: palette.primary.main,
              cursor: "pointer",
              boxShadow: `0 0px 6px ${palette.primary.light}}`,
            },
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
