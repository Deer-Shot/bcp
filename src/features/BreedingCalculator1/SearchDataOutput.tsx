import "@fontsource-variable/material-symbols-outlined";
import { Box } from "@mui/material";
import React from "react";
import GenderIcon from "../../components/GenderIcon";
import { BreedingRecord } from "../../types/BreedingRecord";
import { getImageSourceById } from "../../utils/getImageSourceById";

const containerStyle = {
  marginTop: "20px",
  padding: 2,
  border: "1px solid gray",
  borderRadius: "8px",
  height: "75vh",
  overflowY: "auto",
  backgroundColor: "#eaeaea",
};

const recordItemStyle = {
  padding: "8px",
  borderBottom: "1px solid lightgray",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.2,
};

const imageStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  objectFit: "cover",
  cursor: "pointer",
  border: "1px solid #000",
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

interface SearchDataOutputProps {
  breedingRecords: BreedingRecord[] | null;
  onImageClick: (id: string) => void;
}

const SearchDataOutput: React.FC<SearchDataOutputProps> = ({ breedingRecords, onImageClick }) => {
  if (breedingRecords === null || breedingRecords.length === 0) {
    return <></>;
  }

  return (
    <Box sx={containerStyle}>
      {breedingRecords.map((record) => (
        <Box key={`${record.Parent1ID}-${record.Parent2ID}-${record.ChildID}`} sx={recordItemStyle}>
          <Box
            component="img"
            src={getImageSourceById(record.Parent1ID)}
            alt={`Image of Parent1 with ID: ${record.Parent1ID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.Parent1ID)}
          />
          <GenderIcon genderType={record.Parent1Gender} />

          <Box sx={iconStyle}>add</Box>

          <Box
            component="img"
            src={getImageSourceById(record.Parent2ID)}
            alt={`Image of Parent2 with ID: ${record.Parent2ID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.Parent2ID)}
          />
          <GenderIcon genderType={record.Parent2Gender} />

          <Box sx={iconStyle}>equal</Box>

          <Box
            component="img"
            src={getImageSourceById(record.ChildID)}
            alt={`Image of Child with ID: ${record.ChildID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.ChildID)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SearchDataOutput;
