import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Login from "./user/Login";
import Register from "./user/Register";
import { Link } from "react-router-dom";
import { navStyle } from "./Style";

const AppLayout = () => {

  return (
    <>
      <Box style={navStyle} sx={{ display: "flex", gap: 3 }}>
        <Login /> 
        <Register /> 
        {/* <Button component={Link} to="MyGallery">My Gallery</Button>  */}
        {/* <Button component={Link} to="upload">Upload Image</Button>  */}
        {/* <Button component={Link} to="albums">My Gallery</Button>  */}
      </Box>
    </>
  );
};
export default AppLayout;