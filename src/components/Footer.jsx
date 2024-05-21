import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      variant="h6"
      align="center"
      color="primary.main"
      component="div"
     
    >
      <Typography>Developed by Merve Öncü</Typography>
      <Typography>Copyright {new Date().getFullYear()}</Typography>
    </Box>
  );
};

export default Footer;
