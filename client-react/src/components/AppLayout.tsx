import { Box, IconButton } from "@mui/material";
import Login from "./user/Login";
import Register from "./user/Register";
import { Link } from "react-router-dom";
import { navStyle } from "./Style";
import { Home } from "@mui/icons-material";
import SearchImages from "./files/SearchImages";

const AppLayout = () => {

  return (
    <>
      <Box style={navStyle} sx={{ display: "flex", gap: 3 }}>
        <Login /> 
        <Register /> 
        <Link to="/">
        <IconButton color="primary"><Home/></IconButton>
        </Link>
        <SearchImages />
      </Box>
    </>
  );
};
export default AppLayout;