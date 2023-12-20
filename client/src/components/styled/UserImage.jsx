import { Box } from "@mui/material";

const UserImage = ({ image, size = "69px" }) => {
  return (
    <Box width={size} height={size} alignSelf={"flex-start"}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://192.168.0.100:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
