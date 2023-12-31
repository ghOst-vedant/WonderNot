import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "src/components/styled/FlexBetween";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import UserImage from "src/components/styled/UserImage";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "src/redux";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(true);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;

  const createPostRequest = async (formData, token) => {
    try {
      const response = await axios.post("/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const posts = await toast.promise(createPostRequest(formData, token), {
        pending: "Creating post...",
        success: "Post created successfully!",
        error: "Error creating post. Please try again.",
      });

      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap={"1.75rem"}>
        <UserImage image={picturePath} />
        <InputBase
          value={post}
          multiline
          placeholder="What's on your mind...."
          onChange={(e) => setPost(e.target.value)}
          sx={{
            width: "100%",
            bgcolor: palette.neutral.light,
            borderRadius: "1.5rem",
            p: "1.2rem 1.8rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <>
          <Box
            borderRadius={"0.5rem"}
            border={`1px solid ${medium}`}
            mt={"1rem"}
            p={"1rem"}
          >
            <Dropzone
              multiple={false}
              onDrop={(acceptedFile) => {
                setImage(acceptedFile[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween gap={"0.5rem"}>
                  <Box
                    {...getRootProps()}
                    border={`1px dashed ${palette.primary.main}`}
                    borderRadius={"0.5rem"}
                    p={"0.25rem 1rem "}
                    width={"100%"}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add image here</p>
                    ) : (
                      <FlexBetween p={"1rem 1rem "}>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton onClick={() => setImage(null)}>
                      {" "}
                      <DeleteOutlined />{" "}
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        </>
      )}
      <Divider sx={{ mt: "1rem", mb: "0.5rem" }} />
      <Box display={"flex"} justifyContent={"flex-end"}>
        {/* <FlexBetween gap={"0.25rem"} onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween> */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            fontSize: 13,
            color: palette.primary.main,
            borderRadius: "2rem",
            p: "0.5rem",
            "&:hover": {
              bgcolor: palette.primary.main,
              color: palette.primary.dark,
              cursor: "pointer",
              boxShadow: `0 0px 6px ${palette.primary.light}}`,
            },
          }}
        >
          Post
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
