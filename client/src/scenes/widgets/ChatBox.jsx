import { React, useState, useEffect } from "react";
import { Box, useTheme, Typography, Divider, Button } from "@mui/material";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import FlexBetween from "src/components/styled/FlexBetween";
import UserImage from "src/components/styled/UserImage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
const ChatBox = ({ chat, currentUser }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //   fetch header of chatbox
  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUser);
    const getUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.data;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (chat !== null) getUser();
  }, [chat, currentUser]);

  // For fetching the messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/message/${chat?._id}`);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (message) => {
    setNewMessage(message);
  };

  return (
    <WidgetWrapper
      width={"75%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {userData ? (
        <>
          <Box>
            <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
              <Box display={"flex"}>
                <FlexBetween gap="1rem">
                  <UserImage image={userData?.picturePath} size="55px" />
                  <Box>
                    <Typography color={main} variant="h5" fontWeight="500">
                      {userData?.firstName} {userData?.lastName}
                    </Typography>
                  </Box>
                </FlexBetween>
              </Box>
              <Divider
                sx={{ my: "0.25rem", width: "85%", alignSelf: "center" }}
              />
            </Box>
            {/* Chat messages */}
            <Box display={"flex"} flexDirection={"column"} px={"1rem"}>
              {messages.map((message, index) => (
                <>
                  {message?.senderId === currentUser ? (
                    <Box
                      key={message._id}
                      alignSelf={"flex-start"}
                      marginTop={"0.5rem"}
                      padding={"0.5rem 1rem"}
                      bgcolor={palette.background.default}
                      borderRadius={"1rem"}
                    >
                      <Typography>{message?.text}</Typography>
                      <Typography fontSize={"0.75rem"}>
                        {format(message?.createdAt)}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      key={index}
                      alignSelf={"flex-end"}
                      marginTop={"0.5rem"}
                      padding={"0.5rem 1rem"}
                      bgcolor={palette.background.default}
                      borderRadius={"1rem"}
                    >
                      <Typography>{message?.text}</Typography>
                      <Typography fontSize={"0.7rem"} textAlign={"right"}>
                        {format(message?.createdAt)}
                      </Typography>
                    </Box>
                  )}
                </>
              ))}
            </Box>
          </Box>
          <Box
            bgcolor={palette.background.default}
            borderRadius={"2rem"}
            px={"0.25rem"}
            py={"0.25rem"}
            display={"flex"}
          >
            <InputEmoji
              theme={`${mode}`}
              value={newMessage}
              onChange={handleChange}
              placeholder="Type Here....."
            />
            {newMessage ? (
              <Button
                sx={{
                  padding: "0rem",
                  borderRadius: "2rem",
                  color: `${palette.primary.light}`,
                }}
              >
                <SendRoundedIcon
                  sx={{
                    "&:hover": {
                      color: `${dark}`,
                    },
                  }}
                />
              </Button>
            ) : (
              <Button disabled>
                <SendRoundedIcon />
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Box>
          <Typography
            variant="h3"
            fontFamily={"DM Sans"}
            textAlign={"center"}
            color={palette.neutral.main}
          >
            Select a conversation to chat....
          </Typography>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ChatBox;
