import "@fontsource-variable/material-symbols-outlined";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const iconStyle = {
  fontFamily: "Material Symbols Outlined Variable",
  fontSize: "50px",
  display: "inline-block",
  lineHeight: 1,
  textTransform: "none",
  letterSpacing: "normal",
  whiteSpace: "nowrap",
  direction: "ltr",
  color: "black",
};

const BreedingCalculator1 = () => {
  return (
    <Link to="/breeding-calculator1" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFECB3",
          borderRadius: "8px",
          width: "300px",
          height: "50px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={iconStyle}>radio_button_unchecked</Box>
          <Box sx={iconStyle}>add</Box>
          <Box sx={iconStyle}>help</Box>
          <Box sx={iconStyle}>equal</Box>
          <Box sx={iconStyle}>help</Box>
        </Box>
      </Box>
    </Link>
  );
};

export default BreedingCalculator1;
