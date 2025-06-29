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
  setSelectedImage1: (image: string | null) => void;
  setImageCleared1: (cleared: boolean) => void;
  setSelectedImage2: (image: string | null) => void;
  setImageCleared2: (cleared: boolean) => void;
}

const SearchDataInput: React.FC<SearchDataInputProps> = ({
  setSelectedImage1,
  setImageCleared1,
  setSelectedImage2,
  setImageCleared2,
}) => {
  return (
    <Box sx={containerStyle}>
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage1(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared1(cleared)}
      />
      <Box sx={iconStyle}>add</Box>
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage2(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared2(cleared)}
      />
      <Box sx={iconStyle}>equal</Box>
      <Box sx={iconStyle}>help</Box>
    </Box>
  );
};

export default SearchDataInput;
