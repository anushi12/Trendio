// import Loading from "./components/common/Loading";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/protected/Home";
import Search from "./pages/protected/Search";
import Error from "./pages/Error";
import Register from "./pages/Register"
import { Box } from "@mui/material";
import ProtectedLayout from "./pages/protected/ProtectedLayout";

const App = () =>{
  return (
      <>
      <Box>
        {/* <Register/> */}
       <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route exact path="/" element={<ProtectedLayout/>}>
            <Route exact path="" element={<Home/>}/>
            <Route exact path="" element={<Search/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>
        </Routes>
     </BrowserRouter>
      </Box>
      </>
    
  );
}

export default App;