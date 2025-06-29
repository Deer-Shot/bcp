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
  const [filteredRecords, setFilteredRecords] = useState<BreedingRecord[] | null>(null);
  const [selectedPalData, setSelectedPalData] = useState<PalDetails>();
  const [selectedImage1, setSelectedImage1] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<string | null>(null);
  const [selectedImage4, setSelectedImage4] = useState<string | null>(null);
  const [imageCleared1, setImageCleared1] = useState(false);
  const [imageCleared2, setImageCleared2] = useState(false);
  const [imageCleared3, setImageCleared3] = useState(false);
  const [imageCleared4, setImageCleared4] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);

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

  useEffect(() => {
    setSelectedImage3(null);
    setImageCleared3(false);
  }, [imageCleared3]);

  useEffect(() => {
    setSelectedImage4(null);
    setImageCleared4(false);
  }, [imageCleared4]);

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

  const PARENT_IDS: (keyof BreedingRecord)[] = ["Parent2ID", "Parent3ID", "Parent4ID", "Parent5ID", "Parent6ID"];

  const EXCLUDED_IDS = ["096B", "108", "109", "110", "110B", "111", "112", "112B", "127", "155"];

  const isMatch = (record: BreedingRecord, filterId: string | null): boolean => {
    if (!filterId) return true;
    return PARENT_IDS.some((parentId) => record[parentId] === filterId);
  };

  const updateFilteredRecords = (
    baseRecords: BreedingRecord[] | null,
    filterId3: string | null,
    filterId4: string | null,
    isFilterEnabled: boolean
  ): BreedingRecord[] | null => {
    if (!baseRecords) return null;

    return baseRecords.filter((record) => {
      const matchesFilterId3 = isMatch(record, filterId3);
      const matchesFilterId4 = isMatch(record, filterId4);

      const matchesExclusion = isFilterEnabled
        ? !EXCLUDED_IDS.some((excludedId) =>
            PARENT_IDS.some(
              (parentId) => record[parentId] === excludedId && ![filterId3, filterId4].includes(excludedId)
            )
          )
        : true;

      return matchesFilterId3 && matchesFilterId4 && matchesExclusion;
    });
  };

  useEffect(() => {
    const updatedRecords = updateFilteredRecords(breedingRecords, selectedImage3, selectedImage4, filterEnabled);
    setFilteredRecords(updatedRecords);
  }, [breedingRecords, selectedImage3, selectedImage4, filterEnabled]);

  return (
    <Box sx={{ padding: 1 }}>
      <SearchDataInput
        setSelectedImage1={setSelectedImage1}
        setImageCleared1={setImageCleared1}
        setSelectedImage2={setSelectedImage2}
        setImageCleared2={setImageCleared2}
        setSelectedImage3={setSelectedImage3}
        setImageCleared3={setImageCleared3}
        setSelectedImage4={setSelectedImage4}
        setImageCleared4={setImageCleared4}
        filterEnabled={filterEnabled}
        setFilterEnabled={setFilterEnabled}
      />
      <Box sx={{ marginBottom: 2 }} />
      <Box>
        <SearchDataOutput breedingRecords={filteredRecords} onImageClick={handleImageClick} />
      </Box>
      <PalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} palData={selectedPalData} />
    </Box>
  );
};

export default BreedingCalculator;
