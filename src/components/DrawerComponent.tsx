import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { usePalContext } from "../features/PalContext/PalContext";

interface DrawerComponentProps {
  onImageClick?: (id: string) => void;
  onImageClear?: (cleared: boolean) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ onImageClick, onImageClear }) => {
  const { palList } = usePalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleCircleClick = () => {
    setIsOpen(true);
  };

  const handleImageClick = (id: string, image: string) => {
    setSelectedImage(image);
    setIsOpen(false);
    if (onImageClick) {
      onImageClick(id);
    }
  };

  const handleClearImage = () => {
    setSelectedImage("");
    if (onImageClear) {
      onImageClear(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          border: "1px solid gray",
          borderRadius: "8px",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid #000",
            position: "relative",
          }}
          onClick={handleCircleClick}
        >
          {selectedImage && <Avatar src={selectedImage} alt="Selected" sx={{ width: "100%", height: "100%" }} />}
        </Box>

        <IconButton onClick={handleClearImage} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "80vh",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "flex-start",
          }}
        >
          {palList.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: 50,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(item.id, item.image)}
            >
              <Avatar
                src={item.image}
                alt={`Item ${item.id}`}
                sx={{
                  width: "100%",
                  height: 50,
                  border: "1px solid #000",
                  borderRadius: "50%",
                  boxSizing: "border-box",
                }}
              />

              <Typography variant="caption" display="block" sx={{ color: "black", whiteSpace: "pre-line" }}>
                {item.id}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
