import { Box } from "@mui/material";
import BreedingCalculator1 from "./BreedingCalculator1";
import BreedingCalculator2 from "./BreedingCalculator2";
import BreedingCalculator3 from "./BreedingCalculator3";
import BreedingCalculator4 from "./BreedingCalculator4";

const homeStyle = {
  textAlign: "center",
  marginTop: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  alignItems: "center",
};

const Home = () => {
  return (
    <Box sx={homeStyle}>
      <BreedingCalculator1 />
      <BreedingCalculator2 />
      <BreedingCalculator3 />
      <BreedingCalculator4 />
    </Box>
  );
};

export default Home;
