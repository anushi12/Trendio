import { Avatar, AvatarGroup, Badge, Stack, Stepper } from "@mui/material";

const PostOne = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              alt="+"
              src=""
              sx={{
                width: 20,
                height: 20,
                bgcolor: "green",
                position: "relative",
                right: 4,
                bottom: 4,
              }}
            >
              {" "}
              +{" "}
            </Avatar>
          }
        >
          <Avatar alt="AJ" src="" sx={{ width: 40, height: 40 }} />
        </Badge>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          height={"100%"}
        >
          <Stepper
            orientation={"vertical"}
            activeStep={0}
            sx={{ border: "0.1rem solid gray", width: "0px", height: "100%" }}
          ></Stepper>
          <AvatarGroup 
            // total={4}
            max={3} 
            sx={{
            '& .MuiAvatar-root':{
              width: 24,
              height: 24,
              fontSize: 12,
            },
          }}>
            <Avatar src="" alt=""/> 
          </AvatarGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;
