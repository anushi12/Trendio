import {Button, Stack, TextField, Typography} from "@mui/material"


const Register = () =>{
  return (
  <>
   <Stack 
      width={"100%"}
      height={"100vh"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        color:" #131010",
        bgcolor: " #BCCCDC"
      }}
   >
    <Stack flexDirection={"column"} width={"40%"} gap={2} mt={20}>
      <Typography
        variant="h5"
        fontSize={"1.5rem"}
        fontWeight={"bold"}
        alignSelf={"center"}
      >Login with email</Typography>
      <TextField variant="outlined" placeholder="Enter your username" sx={{ border: "1px solid #F72C5B", borderRadius: "10px"}}/>
      <TextField variant="outlined" placeholder="Enter your email" sx={{borderRadius: "10px", border: "1px solid #F72C5B"}}/>
      <TextField variant="outlined" placeholder="Enter your password" sx={{borderRadius: "10px", border: "1px solid #F72C5B"}}/>
      <Button size="large" sx={{width: '100%', height: 52, fontSize: "1rem", bgcolor: " #F72C5B", color: "white" ,
        ":hover" : {
          cursor: "pointer",
          bgcolor: " #FF3E6D"
        }
      }}>SIGNUP</Button>
      <Typography variant="subtitle2"
        fontSize={"1.3rem"}
        alignSelf={"center"}
      >Already have an account? <span className="login-link">Login</span> 
      </Typography>
    </Stack>
   </Stack>
  </>
  )
}

export default Register;