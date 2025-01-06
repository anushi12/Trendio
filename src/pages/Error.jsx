import { Button, Stack, Typography } from "@mui/material"
const Error = () =>{
  return (
    <>
    <Stack 
      width={"100%"}
      height={"100vh"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      sx = {{
        bgcolor: " #D6CFB4",
      }}
      >
        <Stack
          p={5}
          border={"1px solid #F72798"}
          bgcolor={" #000000"}
          borderRadius={"10px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          boxShadow={'5px 5px 5px rgb(110, 23, 71)'}
        >
            <Typography variant="h3" sx={{color: "white"}}>OOP's</Typography>
            <Typography variant="h6" sx={{color:"white"}}>You are on the wrong page</Typography>
            <Button size="large" sx={{bgcolor: " #F72798", color: "black", borderRadius: "10px", p: "2",
              ":hover":{
                bgcolor: "rgb(239, 148, 198)",
                cursor: "pointer"
              }
            }}>Go Back</Button>
        </Stack>

    </Stack>
    </>
  )
}

export default Error;