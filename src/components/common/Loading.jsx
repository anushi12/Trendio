import {CircularProgress, Stack} from "@mui/material";

const Loading = () =>{
  return (
    <Stack flexDirection={"row"}
           minHeight={"50vh"}
           height={"100%"}
           width={"100%"}
           justifyContent={"center"}
           alignItems={"center"}
    >
      <CircularProgress color="success"/>
    </Stack>
  );
}

export default Loading;