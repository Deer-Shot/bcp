import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButtonClick = (): void => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      console.warn("no history");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {location.pathname !== "/" && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleBackButtonClick}
                aria-label="back"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={scrollToTop}
                sx={{ marginRight: 2 }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
