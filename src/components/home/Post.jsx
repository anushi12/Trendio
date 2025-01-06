import { Stack, Typography } from "@mui/material";
import {IoIosMore} from "react-icons/io";
import PostOne from "./post/PostOne";
import PostTwo from "./post/PostTwo";

const Post = ()=>{
  return (
    <>
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"3px solid gray"}
      p={2}
      mx={"auto"}
      width={"70%"}
      sx={{
        ":hover":{
          cursor: "pointer",
          boxShadow: "10px 10px 10px gray",
        },
        transition: "all ease-in-out 0.3s",
      }}
    >
      <Stack flexDirection={"row"} gap={2}>
        <PostOne/>
        <PostTwo/>
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1rem"}
      >
        <Typography variant="caption" color={"GrayText"} fontSize={"1rem"} position={"relative"} top={2}>24hrs</Typography>
        <IoIosMore/>
      </Stack>

    </Stack>
    </>
  )
}
export default Post;