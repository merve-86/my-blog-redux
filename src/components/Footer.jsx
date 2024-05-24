import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
        bgcolor: "background.paper",
        py: 2,
      }}
    >
      <Typography variant="h6" color="primary.main">
        Developed by Merve ÖNCÜ
      </Typography>
      <Typography color="secondary.main">Copyright {new Date().getFullYear()}</Typography>
    </Box>
  );
}

export default Footer;
