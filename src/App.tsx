import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BreedingCalculator1 from "./features/BreedingCalculator1/BreedingCalculator1";
import BreedingCalculator2 from "./features/BreedingCalculator2/BreedingCalculator2";
import BreedingCalculator3 from "./features/BreedingCalculator3/BreedingCalculator3";
import BreedingCalculator4 from "./features/BreedingCalculator4/BreedingCalculator4";
import Home from "./features/Home/Home";
import Navbar from "./features/Navbar/Navbar";
import { lightTheme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breeding-calculator1" element={<BreedingCalculator1 />} />
          <Route path="/breeding-calculator2" element={<BreedingCalculator2 />} />
          <Route path="/breeding-calculator3" element={<BreedingCalculator3 />} />
          <Route path="/breeding-calculator4" element={<BreedingCalculator4 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
