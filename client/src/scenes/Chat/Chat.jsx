import { React, useState, useEffect } from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import Navbar from "../navbar/Navbar";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import Convo from "src/components/styled/Convo";
import ChatBox from "../widgets/ChatBox";
import { LocalGasStation } from "@mui/icons-material";

const Chat = () => {
  const online = true;
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const { _id } = useSelector((state) => state.user);

  // states
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const getuser = async () => {
    const { data } = await axios.get(`/chat/${_id}`);
    setChats(data);
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      <Navbar />
      <Box margin={"2.5rem 5rem"} display={"flex"} gap={"2rem"}>
        <WidgetWrapper width={"25%"}>
          <Typography variant="h3" color={dark} fontWeight="500" pl={"0.5rem"}>
            Chats
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            mt={"1rem"}
            mb={"0.5rem"}
            height={"auto"}
            minHeight={"60vh"}
            overflow={"scroll"}
          >
            {chats.map((chat, index) => {
              return (
                <Box
                  key={chat._id}
                  display={"flex"}
                  flexDirection={"column"}
                  // border={"2px solid red"}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Convo data={chat} currentUserId={_id} online={online} />
                  {index < chats.length - 1 && (
                    <Divider
                      sx={{ my: "0.25rem", width: "60%", alignSelf: "center" }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </WidgetWrapper>
        <ChatBox chat={currentChat} currentUser={_id} />
      </Box>
    </>
  );
};

export default Chat;
