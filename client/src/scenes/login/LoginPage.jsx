import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box
        width={"100%"}
        bgcolor={alt}
        padding={"0.5rem 6%"}
        textAlign={"center"}
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          WonderNot
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        // pb={"1rem"}
        m="1.5rem auto"
        borderRadius={"1.5rem"}
        bgcolor={alt}
      >
        <Typography
          textAlign={"center"}
          fontWeight="500"
          variant="h4"
          // sx={{ mb: "1.5rem" }}
        >
          Welcome to WonderNot
        </Typography>
      </Box>
      {isNonMobileScreens ? (
        <Box width={"80%"} display={"flex"} margin={"auto"}>
          <Form />
        </Box>
      ) : (
        <Box
          width={"85%"}
          flexBasis={"1"}
          alignItems={"center"}
          margin={"auto"}
        >
          <Form />
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
