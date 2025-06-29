import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PalModal from "../../components/PalModal";
import { BreedingRecord } from "../../types/BreedingRecord";
import { PalDetails } from "../../types/PalDetails";
import { usePalContext } from "../PalContext/PalContext";
import SearchDataInput from "./SearchDataInput";
import SearchDataOutput from "./SearchDataOutput";
import { fetchBreedingRecords } from "./fetchBreedingRecords";

const BreedingCalculator: React.FC = () => {
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[] | null>(null);
  const [selectedPalData, setSelectedPalData] = useState<PalDetails>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageCleared, setImageCleared] = useState(false);
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
    setSelectedImage(null);
    setImageCleared(false);
  }, [imageCleared]);

  const handleBreedingCalculation = async (): Promise<void> => {
    try {
      const records = await fetchBreedingRecords(selectedImage);
      setBreedingRecords(records);
    } catch (error) {
      console.error("Error during image selection:", error);
    }
  };

  useEffect(() => {
    handleBreedingCalculation();
  }, [selectedImage]);

  return (
    <Box sx={{ padding: 1 }}>
      <Box>
        <SearchDataInput
          onImageClick={(selectedImageSrc: string) => setSelectedImage(selectedImageSrc)}
          onImageClear={() => setImageCleared(true)}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }} />
      <Box>
        <SearchDataOutput breedingRecords={breedingRecords} onImageClick={handleImageClick} />
      </Box>
      <PalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} palData={selectedPalData} />
    </Box>
  );
};

export default BreedingCalculator;
