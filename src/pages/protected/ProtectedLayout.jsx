import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

const ProtectedLayout = () =>{
  return (
    <Stack
      flexDirection={"column"}
      maxWidth={"800px"}
      minWidth={"100%"}
      mx = {"auto"}
      overflow={"hidden"}
    >
      <Header/>
      <Outlet/>
    </Stack>
  )
}

export default ProtectedLayout;