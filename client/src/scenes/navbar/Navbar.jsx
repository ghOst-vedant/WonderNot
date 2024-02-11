import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "src/redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "src/components/styled/FlexBetween";
import axios from "axios";

import SearchList from "src/components/styled/SearchList";
const Navbar = ({ isChat = true }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  try {
    if (`${user.firstName}` == null) {
      navigate("/");
    }
  } catch (error) {}
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success("Logged out");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/users/search?keyword=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error.message);
    }
  };
  const search = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search results if the click is outside the search box
      if (search.current && !search.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem" display={"flex"} alignItems={"center"}>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            WonderNot
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              display={"flex"}
              margin={"auto"}
              backgroundColor={neutralLight}
              borderRadius="20px"
              padding="0.2rem 0.75rem"
              ref={search}
            >
              <InputBase
                placeholder={"Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton
              onClick={() => {
                let mode = "";
                let icon;
                let color = "theme.palette.neutral.dark";
                if (`${theme.palette.mode}` === "dark") {
                  mode = "Light Mode";
                  icon = <LightMode />;
                } else {
                  mode = "Dark Mode";
                  icon = <DarkMode />;
                }
                toast(mode, {
                  style: {
                    padding: "0.5rem 0.25rem",
                    boxShadow: `0px 0px 50px ${theme.palette.primary.light}`,
                    color: `${color}`,
                  },
                  icon: icon,
                  duration: 800,
                });
                dispatch(setMode());
              }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message
              sx={{ fontSize: "25px" }}
              onClick={() => {
                navigate("/chat");
              }}
            />

            <FormControl variant="standard" value={fullName}>
              <Select
                ref={menu}
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "170px",
                  borderRadius: "0.5rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    toast.success("Logged out");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            ref={menu}
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            top="0"
            zIndex="10"
            maxWidth="300px"
            minWidth="100px"
            maxHeight={"450px"}
            minHeight={"300px"}
            padding={"1.5rem 2rem"}
            backgroundColor={alt}
            borderRadius={"1rem 0rem 0rem 1rem"}
            boxShadow={`0px 0px 16px ${background}`}
          >
            {/* CLOSE ICON */}
            <Box
              display="flex"
              position={"fixed"}
              right={"0.5rem"}
              justifyContent="flex-end"
            >
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                sx={{ fontSize: "25px" }}
              >
                <Close sx={{ fontSize: "25px" }} />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              mt={"2.5rem"}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2.5rem"
            >
              <IconButton
                onClick={() => {
                  let mode = "";
                  let icon;
                  let color = "";
                  if (`${theme.palette.mode}` === "dark") {
                    mode = "Light Mode";
                    icon = <LightMode />;
                  } else {
                    mode = "Dark Mode";
                    icon = <DarkMode />;
                    color = "theme.palette.neutral.dark";
                  }
                  toast(mode, {
                    style: {
                      padding: "0.5rem 0.25rem",
                      boxShadow: `0 0 30px rgba(8, 112, 184, 0.7)`,
                      color: `${color}`,
                    },
                    icon: icon,
                    duration: 800,
                  });
                  dispatch(setMode());
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "30px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "30px" }} />
                )}
              </IconButton>
              <Message
                sx={{ fontSize: "30px" }}
                onClick={() => {
                  navigate("/chat");
                }}
              />
              <Logout sx={{ fontSize: "30px" }} onClick={handleLogout} />
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
      {!isNonMobileScreens && (
        <Box
          display={"flex"}
          margin={"auto"}
          marginTop={"1rem"}
          justifyContent={"center"}
          backgroundColor={neutralLight}
          borderRadius="20px"
          width={"50%"}
          padding="0.2rem 0.75rem"
          ref={search}
        >
          <InputBase
            placeholder={"Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </Box>
      )}
      {searchResults?.length > 0 && (
        <Box
          zIndex={"10"}
          bgcolor={alt}
          position={"absolute"}
          top={isNonMobileScreens ? "10%" : "23%"}
          left={isNonMobileScreens ? "22%" : "9%"}
          padding={"1rem 1rem"}
          width={isNonMobileScreens ? "22%" : "83%"}
          borderRadius={"0.5rem"}
          boxShadow={`0px 0px 10px ${theme.palette.background.default}`}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={"0.75rem"}
          mt={"0.5rem"}
          backgroundColor={alt}
          sx={{
            overflow: "scroll",
            maxHeight: "100vh",
          }}
        >
          {searchResults.map((user, index) => (
            <>
              <SearchList
                key={user._id}
                friendId={user._id}
                name={`${user.firstName} ${user.lastName}`}
                userPicturePath={user.picturePath}
                isChat
              />
              {index < searchResults.length - 1 && (
                <Divider
                  sx={{ my: "0.1rem", width: "60%", alignSelf: "center" }}
                />
              )}
            </>
          ))}
        </Box>
      )}
    </>
  );
};

export default Navbar;
