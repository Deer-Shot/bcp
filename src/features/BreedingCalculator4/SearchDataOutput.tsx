import "@fontsource-variable/material-symbols-outlined";
import { Box } from "@mui/material";
import React from "react";
import { FixedSizeList } from "react-window";
import GenderIcon from "../../components/GenderIcon";
import { BreedingRecord } from "../../types/BreedingRecord";
import { getImageSourceById } from "../../utils/getImageSourceById";

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

const commaStyle = {
  fontSize: "40px",
  display: "inline-block",
  lineHeight: 1,
  textTransform: "none",
  letterSpacing: "normal",
  whiteSpace: "nowrap",
  direction: "ltr",
  color: "black",
};

const noDataStyle = {
  textAlign: "center",
  color: "gray",
  padding: 2,
  fontSize: "16px",
};

const Row = ({
  index,
  style,
  data,
  onImageClick,
}: {
  index: number;
  style: React.CSSProperties;
  data: BreedingRecord[];
  onImageClick: (id: string) => void;
}) => {
  const record = data[index];
  return (
    <Box
      key={`${record.Parent1ID}-${record.Parent2ID}-${record.Parent3ID}-${record.Parent4ID}-${record.Parent5ID}-${record.Parent6ID}-${record.ChildID}`}
      sx={recordItemStyle}
      style={style}
    >
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

      {record.Parent3ID && (
        <>
          <Box
            component="img"
            src={getImageSourceById(record.Parent3ID)}
            alt={`Image of Parent2 with ID: ${record.Parent3ID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.Parent3ID!)}
          />
          <GenderIcon genderType={record.Parent3Gender!} />
          <Box sx={commaStyle}>,</Box>
          <Box
            component="img"
            src={getImageSourceById(record.Parent3ID)}
            alt={`Image of Parent2 with ID: ${record.Parent3ID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.Parent3ID!)}
          />
          <GenderIcon genderType={record.Parent3Gender!} />
          <Box sx={iconStyle}>add</Box>

          <Box
            component="img"
            src={getImageSourceById(record.Parent4ID!)}
            alt={`Image of Parent2 with ID: ${record.Parent4ID}`}
            sx={imageStyle}
            onClick={() => onImageClick(record.Parent4ID!)}
          />
          <GenderIcon genderType={record.Parent4Gender!} />
          <Box sx={iconStyle}>equal</Box>

          {record.Parent5ID && (
            <>
              <Box
                component="img"
                src={getImageSourceById(record.Parent5ID!)}
                alt={`Image of Parent2 with ID: ${record.Parent5ID}`}
                sx={imageStyle}
                onClick={() => onImageClick(record.Parent5ID!)}
              />
              <GenderIcon genderType={record.Parent5Gender!} />
              <Box sx={commaStyle}>,</Box>
              <Box
                component="img"
                src={getImageSourceById(record.Parent5ID!)}
                alt={`Image of Parent2 with ID: ${record.Parent5ID}`}
                sx={imageStyle}
                onClick={() => onImageClick(record.Parent5ID!)}
              />
              <GenderIcon genderType={record.Parent5Gender!} />
              <Box sx={iconStyle}>add</Box>

              <Box
                component="img"
                src={getImageSourceById(record.Parent6ID!)}
                alt={`Image of Parent2 with ID: ${record.Parent6ID}`}
                sx={imageStyle}
                onClick={() => onImageClick(record.Parent6ID!)}
              />
              <GenderIcon genderType={record.Parent6Gender!} />
              <Box sx={iconStyle}>equal</Box>
            </>
          )}
        </>
      )}

      <Box
        component="img"
        src={getImageSourceById(record.ChildID)}
        alt={`Image of Child with ID: ${record.ChildID}`}
        sx={imageStyle}
        onClick={() => onImageClick(record.ChildID)}
      />
    </Box>
  );
};

const listHeight = window.innerHeight * 0.75;
const listWidth = "100%";

interface SearchDataOutputProps {
  breedingRecords: BreedingRecord[] | null;
  onImageClick: (id: string) => void;
}

const SearchDataOutput: React.FC<SearchDataOutputProps> = ({ breedingRecords, onImageClick }) => {
  if (breedingRecords === null || breedingRecords.length === 0) {
    return <Box sx={noDataStyle}>Not yet calculated or cannot breed within 3 times</Box>;
  }

  return (
    <FixedSizeList
      height={listHeight}
      width={listWidth}
      style={{ overflowX: "hidden", backgroundColor: "#eaeaea" }}
      itemCount={breedingRecords.length}
      itemSize={80}
      itemData={breedingRecords}
    >
      {({ index, style }) => <Row index={index} style={style} data={breedingRecords} onImageClick={onImageClick} />}
    </FixedSizeList>
  );
};

export default SearchDataOutput;
