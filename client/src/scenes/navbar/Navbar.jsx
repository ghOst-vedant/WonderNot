import { useState } from "react";
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
// import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "src/redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "src/components/styled/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
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
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
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
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
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
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          top="0"
          right="0"
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
            <Message sx={{ fontSize: "30px" }} />
            <Notifications sx={{ fontSize: "30px" }} />
            <Logout sx={{ fontSize: "30px" }} onClick={handleLogout} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
