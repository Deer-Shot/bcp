import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PalModal from "../../components/PalModal";
import { BreedingRecord } from "../../types/BreedingRecord";
import { PalDetails } from "../../types/PalDetails";
import { usePalContext } from "../PalContext/PalContext";
import { fetchBreedingRecords } from "./fetchBreedingRecords";
import SearchDataInput from "./SearchDataInput";
import SearchDataOutput from "./SearchDataOutput";

const BreedingCalculator: React.FC = () => {
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[] | null>(null);
  const [selectedPalData, setSelectedPalData] = useState<PalDetails>();
  const [selectedImage1, setSelectedImage1] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [imageCleared1, setImageCleared1] = useState(false);
  const [imageCleared2, setImageCleared2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { palList } = usePalContext();

  const handleImageClick = (id: string) => {
    const matchedData = palList.find((pal) => pal.id === id);
    if (matchedData) {
      setSelectedPalData(matchedData);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    setSelectedImage1(null);
    setImageCleared1(false);
  }, [imageCleared1]);

  useEffect(() => {
    setSelectedImage2(null);
    setImageCleared2(false);
  }, [imageCleared2]);

  const handleBreedingCalculation = async (): Promise<void> => {
    try {
      const records = await fetchBreedingRecords(selectedImage1, selectedImage2);
      setBreedingRecords(records);
    } catch (error) {
      console.error("Error during image selection:", error);
    }
  };

  useEffect(() => {
    handleBreedingCalculation();
  }, [selectedImage1, selectedImage2]);

  return (
    <Box sx={{ padding: 1 }}>
      <SearchDataInput
        setSelectedImage1={setSelectedImage1}
        setImageCleared1={setImageCleared1}
        setSelectedImage2={setSelectedImage2}
        setImageCleared2={setImageCleared2}
      />
      <Box sx={{ marginBottom: 2 }} />
      <Box>
        <SearchDataOutput breedingRecords={breedingRecords} onImageClick={handleImageClick} />
      </Box>
      <PalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} palData={selectedPalData} />
    </Box>
  );
};

export default BreedingCalculator;
