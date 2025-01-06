import { Stack, Typography } from "@mui/material";
import Navbar from "./Navbar";
import {IoMenu} from "react-icons/io5";

const Header = () =>{
  return (
    <>
     <Stack 
      flexDirection={"row"}
      height={52}
      justifyContent={"space-around"}
      alignItems={"center"}
      position={"sticky"}
      top={0}
      py={1}
    >
      {/* <img src="/logo.png" alt="logo" width={70} height={55} /> */}
      <Typography variant="h4" sx={{color: " #F72C5B", fontWeight: "bold"}}>Trendio</Typography>

      <Stack
      justifyContent={"center"}
      width={'550px'}
      bgcolor={" #131010"}
      color={'white'}
      zIndex={2}
      height={96}
    >
      <Navbar/>
    </Stack>
    <IoMenu size={30}/>
    </Stack >
    </>
  )
}

export default Header;