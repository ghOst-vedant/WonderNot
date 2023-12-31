import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Chip,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "src/redux";
import Dropzone from "react-dropzone";
import FlexBetween from "src/components/styled/FlexBetween";
import toast from "react-hot-toast";
import login from "./login.svg";
import signup from "./signup.svg";
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    skills: [],
    picture: "",
  });
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [newSkill, setNewSkill] = useState([]);

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "" && !register.skills.includes(newSkill)) {
      setRegister((prevRegister) => ({
        ...prevRegister,
        skills: [...prevRegister.skills, newSkill],
      }));
      setNewSkill([]);
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setRegister((prevRegister) => ({
      ...prevRegister,
      skills: prevRegister.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  // Login Handler
  const loginSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = register;

    // Display a loading toast while the request is pending
    const loadingToastId = toast("Logging in...", { autoClose: false });

    try {
      const { data } = await axios.post("auth/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        // Dismiss the loading toast
        toast.dismiss(loadingToastId);
        // Display a success toast
        toast.success("Login Successful");

        setRegister({
          email: "",
          password: "",
        });
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      // Dismiss the loading toast on error
      toast.dismiss(loadingToastId);
      console.error(error);
    }
  };

  // Register Handler

  const registerSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", register.firstName);
    formData.append("lastName", register.lastName);
    formData.append("email", register.email);
    formData.append("password", register.password);
    formData.append("location", register.location);
    register.skills.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });
    formData.append("picture", register.picture);

    // Display a loading toast
    const loadingToastId = toast("Registering...", { autoClose: false });

    try {
      const { data } = await axios.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.dismiss(loadingToastId); // Dismiss the loading toast and display the success
        toast.success("Account Created Successfully");
        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          location: "",
          skills: [],
          picture: "",
        });
        setPageType("login");
      }
    } catch (error) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast on error
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={isLogin ? loginSubmit : registerSubmit}>
        {isNonMobile ? (
          <Box display={"flex"} width={"100%"} margin={"auto"} mt={"3rem"}>
            {isLogin ? (
              <Box
                width={"60%"}
                p={"1rem"}
                display={"flex"}
                justifyContent={"center"}
                margin={"auto"}
                mt={"5rem"}
              >
                {isLogin ? (
                  <img
                    src={login}
                    alt="login illustration"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <img
                    src={signup}
                    alt="signup illustration"
                    style={{ width: "100%" }}
                  />
                )}
              </Box>
            ) : (
              <Box width={"60%"} p={"2rem"} mt={"3rem"}>
                {isLogin ? (
                  <img
                    src={login}
                    alt="login illustration"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <img
                    src={signup}
                    alt="signup illustration"
                    style={{ width: "100%" }}
                  />
                )}
              </Box>
            )}
            <Box
              // border={"2px solid red"}
              display={"flex"}
              flexWrap={"wrap"}
              gap={2}
              flexDirection={"column"}
              width={"60%"}
              justifyContent={"center"}
              alignItems={"center"}
              margin={"auto"}
            >
              {isRegister && (
                <>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TextField
                      fullWidth
                      label="First name"
                      value={register.firstName}
                      onChange={(e) => {
                        setRegister({ ...register, firstName: e.target.value });
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last name"
                      value={register.lastName}
                      onChange={(e) => {
                        setRegister({ ...register, lastName: e.target.value });
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={"100%"}
                  >
                    <TextField
                      fullWidth
                      label="Location"
                      value={register.location}
                      onChange={(e) => {
                        setRegister({ ...register, location: e.target.value });
                      }}
                    />
                    <Box width={isNonMobile ? "100%" : "100%"}>
                      <TextField
                        fullWidth
                        label="Add Skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={handleSkillAdd}>
                              <AddIcon />
                            </IconButton>
                          ),
                        }}
                      />
                      <Box display={"flex"} flexWrap={"wrap"}>
                        {register.skills.map((skill, index) => (
                          <Chip
                            required
                            key={index}
                            label={skill}
                            onDelete={() => handleSkillDelete(skill)}
                            style={{ margin: "4px" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    width={"100%"}
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius={"1rem"}
                    p={"0.75rem"}
                  >
                    <Dropzone
                      multiple={false}
                      onDrop={(acceptedFile) => {
                        setRegister({ ...register, picture: acceptedFile[0] });
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`1px dashed ${palette.primary.main}`}
                          borderRadius={"0.5rem"}
                          p={"0.25rem 0.5rem "}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!register.picture ? (
                            <p>Add picture</p>
                          ) : (
                            <FlexBetween p={"0.5rem 0.5rem "}>
                              <Typography>{register.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              {isLogin ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={4}
                  width={"70%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mt={"4rem"}
                >
                  <TextField
                    label="Email"
                    value={register.email}
                    onChange={(e) => {
                      setRegister({ ...register, email: e.target.value });
                    }}
                    name="email"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={register.password}
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                    }}
                    name="password"
                    fullWidth
                  />
                </Box>
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={4}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <TextField
                    label="Email"
                    value={register.email}
                    onChange={(e) => {
                      setRegister({ ...register, email: e.target.value });
                    }}
                    name="email"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={register.password}
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                    }}
                    name="password"
                    fullWidth
                  />
                </Box>
              )}
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={1}
                justifyContent={"center"}
                width={"80%"}
              >
                <Button
                  type="submit"
                  sx={{
                    fontSize: "1rem",
                    m: "1rem 0",
                    p: "0.5rem 5rem",
                    borderRadius: "1rem",
                    bgcolor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {isLogin ? "login" : "register"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                  }}
                  sx={{
                    textDecoration: "underline",
                    mb: "1rem",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
              flexDirection={"column"}
              width={"100%"}
            >
              {isRegister && (
                <>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TextField
                      fullWidth
                      label="First name"
                      value={register.firstName}
                      onChange={(e) => {
                        setRegister({ ...register, firstName: e.target.value });
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last name"
                      value={register.lastName}
                      onChange={(e) => {
                        setRegister({ ...register, lastName: e.target.value });
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={isNonMobile ? "50%" : "100%"}
                  >
                    <TextField
                      fullWidth
                      label="Location"
                      value={register.location}
                      onChange={(e) => {
                        setRegister({ ...register, location: e.target.value });
                      }}
                    />
                    <Box width={isNonMobile ? "70%" : "100%"}>
                      <TextField
                        fullWidth
                        label="Add Skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={handleSkillAdd}>
                              <AddIcon />
                            </IconButton>
                          ),
                        }}
                      />
                      <Box display={"flex"} flexWrap={"wrap"}>
                        {register.skills.map((skill, index) => (
                          <Chip
                            required
                            key={index}
                            label={skill}
                            onDelete={() => handleSkillDelete(skill)}
                            style={{ margin: "4px" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    width={isNonMobile ? "50%" : "100%"}
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius={"1rem"}
                    p={"0.75rem"}
                  >
                    <Dropzone
                      multiple={false}
                      onDrop={(acceptedFile) => {
                        setRegister({ ...register, picture: acceptedFile[0] });
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`1px dashed ${palette.primary.main}`}
                          borderRadius={"0.5rem"}
                          p={"0.25rem 0.5rem "}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!register.picture ? (
                            <p>Add picture</p>
                          ) : (
                            <FlexBetween p={"0.5rem 0.5rem "}>
                              <Typography>{register.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={4}
                width={isNonMobile ? "50%" : "100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <TextField
                  label="Email"
                  value={register.email}
                  onChange={(e) => {
                    setRegister({ ...register, email: e.target.value });
                  }}
                  name="email"
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={register.password}
                  onChange={(e) => {
                    setRegister({ ...register, password: e.target.value });
                  }}
                  name="password"
                  fullWidth
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              justifyContent={"center"}
              m={"auto"}
              mt={2}
              width={isNonMobile ? "40%" : "80%"}
            >
              <Button
                type="submit"
                sx={{
                  fontSize: "1rem",
                  m: "1rem 0",
                  p: "0.5rem 5rem",
                  borderRadius: "1rem",
                  bgcolor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "login" : "register"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                }}
                sx={{
                  textDecoration: "underline",
                  mb: "1rem",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Typography>
            </Box>
          </>
        )}
      </form>
    </>
  );
};

export default Form;
