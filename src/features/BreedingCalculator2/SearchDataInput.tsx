import "@fontsource-variable/material-symbols-outlined";
import { Box } from "@mui/material";
import React from "react";
import DrawerComponent from "../../components/DrawerComponent";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.5,
};

const iconStyle = {
  fontFamily: "Material Symbols Outlined Variable",
  fontSize: "40px",
  display: "inline-block",
  lineHeight: 1,
  textTransform: "none",
  letterSpacing: "normal",
  whiteSpace: "nowrap",
  direction: "ltr",
  color: "black",
};

interface SearchDataInputProps {
  onImageClick: (selectedImageSrc: string) => void;
  onImageClear: () => void;
}

const SearchDataInput: React.FC<SearchDataInputProps> = ({ onImageClick, onImageClear }) => (
  <Box sx={containerStyle}>
    <Box sx={iconStyle}>help</Box>
    <Box sx={iconStyle}>add</Box>
    <Box sx={iconStyle}>help</Box>
    <Box sx={iconStyle}>equal</Box>
    <DrawerComponent onImageClick={onImageClick} onImageClear={onImageClear} />
  </Box>
);

export default SearchDataInput;
