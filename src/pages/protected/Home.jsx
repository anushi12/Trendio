import { Stack } from "@mui/material";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";

const Home = () =>{
  return ( 
    <>
    <Input/>
    <Stack flexdirection={"column"} gap={2} mb={10}>
    <Post/>
    </Stack>
    </>
  )
}


export default Home;