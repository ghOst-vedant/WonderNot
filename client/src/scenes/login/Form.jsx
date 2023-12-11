import { useState, React } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "src/redux";
import Dropzone from "react-dropzone";
import FlexBetween from "src/components/styled/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  skills: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  skills: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);
      // console.log(formData);
      const savedUserResponse = await fetch(
        "http://192.168.0.100:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(
        "http://192.168.0.100:3001/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        toast.success("Login Successful");
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      alert(error);
    }
  };
  //   Form submit Handler
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit} onTouchStart={handleSubmit}>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
              flexDirection={"column"}
              width={"90%"}
              margin={"auto"}
            >
              {isRegister && (
                <>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={isNonMobile ? "50%" : "100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TextField
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                      fullWidth
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={isNonMobile ? "row" : "column"}
                    gap={4}
                    width={isNonMobile ? "50%" : "100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    justifyItems={"baseline"}
                  >
                    <TextField
                      label="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                      fullWidth
                    />
                    <TextField
                      fullWidth
                      label="skills"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.skills}
                      name="skills"
                      error={Boolean(touched.skills) && Boolean(errors.skills)}
                      helperText={touched.skills && errors.skills}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box
                    width={isNonMobile ? "50%" : "100%"}
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius={"1rem"}
                    p={"0.75rem"}
                  >
                    <Dropzone
                      acceptedFiles={".jpeg,.jpg,.png"}
                      multiple={false}
                      onDrop={(acceptedFile) => {
                        setFieldValue("picture", acceptedFile[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`1px dashed ${palette.primary.main}`}
                          borderRadius={"0.5rem"}
                          p={"0 0.5rem "}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add picture</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
                  resetForm();
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
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
