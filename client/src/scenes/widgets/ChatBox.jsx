import { React, useState, useEffect, useRef } from "react";
import {
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import FlexBetween from "src/components/styled/FlexBetween";
import UserImage from "src/components/styled/UserImage";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useNavigate } from "react-router-dom";
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  online,
}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
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

  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    // Sending message to dB

    try {
      const response = await axios.post(`/message/`, message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }

    // send to socket
    const receiverId = chat?.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };
  // socket to receive message
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <WidgetWrapper
      width={isNonMobileScreens ? "75%" : "90%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      marginTop={isNonMobileScreens ? "0rem" : "1.5rem"}
    >
      {userData ? (
        <>
          <Box overflow={"scroll"}>
            <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
              <Box display={"flex"}>
                <FlexBetween gap="1rem">
                  <UserImage image={userData?.picturePath} size="55px" />
                  <Box>
                    <Typography color={main} variant="h5" fontWeight="500">
                      {userData?.firstName} {userData?.lastName}
                    </Typography>
                    <Box color={"greenyellow"} fontSize="0.75rem">
                      {online && (
                        <Typography fontSize={"0.7rem"}>Online</Typography>
                      )}
                    </Box>
                  </Box>
                </FlexBetween>
              </Box>
              <Divider
                sx={{
                  my: "0.25rem",
                  width: isNonMobileScreens ? "85%" : "70%",
                  alignSelf: "center",
                }}
              />
            </Box>
            {/* Chat messages */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              px={isNonMobileScreens ? "1rem" : "0rem"}
              pb={"1rem"}
              overflow={"scroll"}
              maxHeight={isNonMobileScreens ? "60vh" : "65vh"}
              minHeight={isNonMobileScreens ? "60vh" : "65vh"}
            >
              {messages.map((message, index) => (
                <Box
                  key={message._id}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Box
                    ref={scroll}
                    width={"fit-content"}
                    alignSelf={
                      message?.senderId === currentUser
                        ? "flex-end"
                        : "flex-start"
                    }
                    marginTop={"0.5rem"}
                    padding={"0.5rem 1rem"}
                    bgcolor={palette.background.default}
                    borderRadius={"1rem"}
                  >
                    <Typography>{message?.text}</Typography>
                    <Typography
                      fontSize={"0.7rem"}
                      textAlign={
                        message?.senderId === currentUser ? "right" : "left"
                      }
                    >
                      {format(message?.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            bgcolor={palette.background.default}
            borderRadius={"2rem"}
            px={isNonMobileScreens ? "0.25rem" : "0rem"}
            py={isNonMobileScreens ? "0.25rem" : "0rem"}
            display={"flex"}
          >
            <InputEmoji
              theme={`${mode}`}
              value={newMessage}
              onChange={handleChange}
              onEnter={handleSend}
              placeholder="Type Here....."
            />
            {newMessage ? (
              <Button
                onClick={handleSend}
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
            variant={isNonMobileScreens ? "h3" : "h5"}
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
