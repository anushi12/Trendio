import { TextField } from "@mui/material";

const SearchInput = ()=>{
  return (
    <>
      <TextField sx={{
        width: "90%",
        maxWidth: "750px",
        boxShadow: "5px 5px 5px gray",
        borderRadius: "15px",
        px: 2,
        py: 1,
        my: 5,
        mx: 'auto',
        "& .MuiOutlinedInput-root":{
          color: black,
          "& fieldset":{
            border: "none",
          },
        },
      }}/>
    </>
  )
}

export default SearchInput;