import { Box, Divider, Typography, useTheme } from "@mui/material";
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
        variant="h3"
        color={palette.neutral.dark}
        fontWeight={"500"}
        sx={{ mb: "2rem" }}
      >
        Friends List
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"0.5rem"}
        mb={"0.5rem"}
      >
        {friends ? (
          friends.map((friend, index) => (
            <Box
              key={friend._id}
              display={"flex"}
              flexDirection={"column"}
              gap={"0.5rem"}
            >
              <ListFriend
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                userPicturePath={friend.picturePath}
              />
              {index < friends.length - 1 && (
                <Divider
                  sx={{ my: "0.5rem", width: "60%", alignSelf: "center" }}
                />
              )}
            </Box>
          ))
        ) : (
          <Box>No friends</Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListing;
