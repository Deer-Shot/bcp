import "@fontsource-variable/material-symbols-outlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, FormControlLabel, Switch } from "@mui/material";
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
  setSelectedImage3: (image: string | null) => void;
  setImageCleared3: (cleared: boolean) => void;
  setSelectedImage4: (image: string | null) => void;
  setImageCleared4: (cleared: boolean) => void;
  filterEnabled: boolean;
  setFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDataInput: React.FC<SearchDataInputProps> = ({
  setSelectedImage1,
  setImageCleared1,
  setSelectedImage2,
  setImageCleared2,
  setSelectedImage3,
  setImageCleared3,
  setSelectedImage4,
  setImageCleared4,
  filterEnabled,
  setFilterEnabled,
}) => {
  return (
    <Box sx={containerStyle}>
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage1(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared1(cleared)}
      />
      <Box sx={iconStyle}>add</Box>
      <Box sx={iconStyle}>help</Box>
      <Box sx={iconStyle}>equal</Box>
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage2(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared2(cleared)}
      />

      <Box sx={{ marginLeft: 0.5 }} />

      <FilterListIcon />
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage3(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared3(cleared)}
      />
      <DrawerComponent
        onImageClick={(selectedImageSrc) => setSelectedImage4(selectedImageSrc)}
        onImageClear={(cleared) => setImageCleared4(cleared)}
      />

      <Box sx={{ marginLeft: 0.5 }} />

      <FormControlLabel
        control={<Switch checked={filterEnabled} onChange={(e) => setFilterEnabled(e.target.checked)} />}
        label={
          <span>
            Exclude
            <br />
            Legendary,
            <br />
            RaidBoss
          </span>
        }
      />
    </Box>
  );
};

export default SearchDataInput;
