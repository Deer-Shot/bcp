import "@fontsource-variable/material-symbols-outlined";
import { Box } from "@mui/material";
import React from "react";

const iconStyle = {
  fontFamily: "Material Symbols Outlined Variable",
  fontSize: "20px",
  display: "inline-block",
  lineHeight: 1,
  textTransform: "none",
  letterSpacing: "normal",
  whiteSpace: "nowrap",
  direction: "ltr",
  color: "black",
};

const GenderIcon: React.FC<{ genderType?: string }> = ({ genderType }) => {
  if (!genderType || typeof genderType !== "string") {
    return <></>;
  }

  switch (genderType.toLowerCase()) {
    case "male":
      return <Box sx={iconStyle}>male</Box>;
    case "female":
      return <Box sx={iconStyle}>female</Box>;
    default:
      return <></>;
  }
};

export default GenderIcon;
