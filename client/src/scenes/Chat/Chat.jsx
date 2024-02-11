import { React, useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Divider,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import Navbar from "../navbar/Navbar";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Convo from "src/components/styled/Convo";
import ChatBox from "../widgets/ChatBox";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt;
  const { _id } = useSelector((state) => state.user);
  // states
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();
  useEffect(() => {
    const getuser = async () => {
      const { data } = await axios.get(`/chat/${_id}`);
      setChats(data);
    };
    getuser();
  }, [_id]);
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_SOCKET}`);
    socket.current.emit("new-user-add", _id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [_id]);
  // send message to socket
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  // receive message to socket
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);
  const onlineStatus = (chat) => {
    const chatMembers = chat?.members?.find((member) => member !== _id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  const menu = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu results if the click is outside the search box
      if (menu.current && !menu.current.contains(event.target)) {
        setIsMobileMenuToggled(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Navbar isChat />
      {isNonMobileScreens ? (
        <Box margin={"1.5rem 5rem"} display={"flex"} gap={"2rem"}>
          <WidgetWrapper width={"25%"}>
            <Typography
              variant="h3"
              color={dark}
              fontWeight="500"
              pl={"0.5rem"}
            >
              Chats
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              mt={"1rem"}
              height={"auto"}
              maxHeight={"70vh"}
              overflow={"scroll"}
              minHeight={"10vh"}
            >
              {chats.map((chat, index) => {
                return (
                  <Box key={chat._id}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      onClick={() => {
                        setCurrentChat(chat);
                      }}
                    >
                      <Convo
                        data={chat}
                        currentUserId={_id}
                        online={onlineStatus(chat)}
                      />
                      {index < chats.length - 1 && (
                        <Divider
                          sx={{
                            my: "0.25rem",
                            width: "60%",
                            alignSelf: "center",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </WidgetWrapper>
          <ChatBox
            chat={currentChat}
            currentUser={_id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            online={onlineStatus(currentChat)}
          />
        </Box>
      ) : (
        <>
          <WidgetWrapper
            width={"90%"}
            margin={"auto"}
            mt={"1.5rem"}
            p={"1rem 3%"}
            display={"flex"}
            gap={"1.5rem"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h3"
              color={dark}
              fontWeight="500"
              pl={"0.25rem"}
            >
              Chats
            </Typography>
            <IconButton
              ref={menu}
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <ChatBubbleRoundedIcon />
            </IconButton>
          </WidgetWrapper>
          {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
              position="fixed"
              left="35%"
              zIndex="9"
              display={"flex"}
              flexDirection={"column"}
              mt={"0.5rem"}
              width={"60%"}
              height={"fit-content"}
              overflow={"scroll"}
              padding={"1rem 0.75rem"}
              backgroundColor={alt}
              borderRadius={"1rem"}
              boxShadow={`0px 0px 16px ${background}`}
              minHeight={"30vh"}
              maxHeight={"40vh"}
            >
              {chats.map((chat, index) => {
                return (
                  <Box
                    key={chat._id}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"0.25rem"}
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <Convo
                      data={chat}
                      currentUserId={_id}
                      online={onlineStatus(chat)}
                    />
                    {index < chats.length - 1 && (
                      <Divider
                        sx={{
                          my: "0.25rem",
                          width: "70%",
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
          <Box display={"flex"} margin={"auto"} justifyContent={"center"}>
            <ChatBox
              chat={currentChat}
              currentUser={_id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
              online={onlineStatus(currentChat)}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default Chat;
