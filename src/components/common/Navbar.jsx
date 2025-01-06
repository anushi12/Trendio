import { Stack } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import {Link} from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        maxWidth={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
        >
     <Link to={"/"}>
        <AiFillHome size={30}/>
     </Link>
     <Link to={"/search"}>
        <FaSearch size={30}/>     
     </Link>
     <Link to={"/edit"}>
        <MdEdit size={30}/>
     </Link>
     <Link to={"/like"}>
        <FaRegHeart size={30}/>
     </Link>
     <Link to={"/user"}>
        <RxAvatar size={30}/>
     </Link>
    
      </Stack>
    </>
  )
}

export default Navbar;