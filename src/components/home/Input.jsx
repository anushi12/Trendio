import { Avatar, Stack, Typography } from "@mui/material";



const Input = () => {
  return (
    <>
    <Stack 
       flexDirection = {"row"}
       alignItems={"center"}
       width={"70%"} 
       height={28}
       justifyContent={"space-between"}
       p={3}
       borderBottom={"2px solid gray"}
       my={5}
       mx={"auto"}
       >

        <Stack
          flexDirection={"row"}
          alignItems={"center"} gap={2}
        >
          <Avatar src="" alt="Avatar"/>  
          <Typography color={"GrayText"}>Start a new thread...</Typography>
        </Stack>
       </Stack>
    </>
  )
};

export default Input;