import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import ListFriend from "src/components/styled/ListFriend";
import { useEffect } from "react";
import { setFriends } from "src/redux";
import axios from "axios";
const FriendListing = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await axios.get(`/users/${userId}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={palette.neutral.dark}
        fontWeight={"500"}
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
        {friends ? (
          friends.map((friend) => (
            <ListFriend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Box>No friends</Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListing;
