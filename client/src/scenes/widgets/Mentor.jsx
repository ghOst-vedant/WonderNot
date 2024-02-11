import {
  Divider,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Chip,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import toast from "react-hot-toast";
const Mentor = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [mentorSkills, setMentorSkills] = useState({
    skills: [],
  });
  const handleSkillAdd = () => {
    if (skills.trim() !== "" && !mentorSkills.skills.includes(skills)) {
      setMentorSkills((prevRegister) => ({
        ...prevRegister,
        skills: [...prevRegister.skills, skills],
      }));
      setSkills([]);
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setMentorSkills((prevRegister) => ({
      ...prevRegister,
      skills: prevRegister.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  //   submit mentorship Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `users/${_id}/mentor`,
        { mentorSkills: mentorSkills.skills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.error) {
        toast.error("Error Becoming Mentor!\nPlease try again later");
      } else {
        toast.success("You are now a Mentor !!!!");
        setMentorSkills({ skills: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WidgetWrapper display={"flex"} flexDirection={"column"}>
      <Box>
        <Typography variant="h5" pb={"0.5rem"} fontWeight={"500"}>
          Want to Share your Skills?
        </Typography>
        <Divider />
      </Box>
      <Typography
        py={"1rem"}
        px={"0.5rem"}
        color={dark}
        fontWeight="600"
        display={"flex"}
        gap={"1"}
        alignItems={"center"}
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}
        onClick={() => {
          if (open) {
            setOpen(false);
            console.log(open);
          } else {
            console.log(open);
            setOpen(true);
          }
        }}
      >
        Become A Mentor!! <OpenInNewRoundedIcon />
      </Typography>
      {open && (
        <form onSubmit={handleSubmit}>
          <Box
            width={isNonMobile ? "100%" : "100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={"0.75rem"}
          >
            <TextField
              fullWidth
              label="Add Skill"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSkillAdd}>
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
            <Box display={"flex"} flexWrap={"wrap"}>
              {mentorSkills.skills.map((skill, index) => (
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
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Button
              type="submit"
              sx={{
                fontSize: 13,
                color: palette.primary.main,
                borderRadius: "2rem",
                p: "0.5rem 1.5rem",
                "&:hover": {
                  bgcolor: palette.primary.main,
                  color: palette.primary.dark,
                  cursor: "pointer",
                  boxShadow: `0 0px 6px ${palette.primary.light}}`,
                },
              }}
            >
              Send
            </Button>
          </Box>
        </form>
      )}
    </WidgetWrapper>
  );
};

export default Mentor;
