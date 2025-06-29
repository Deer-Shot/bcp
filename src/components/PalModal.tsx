import { Box, Modal } from "@mui/material";
import { locale } from "@tauri-apps/plugin-os";
import React, { useEffect, useState } from "react";
import { PalDetails } from "../types/PalDetails";

const fetchLocale = async () => {
  return await locale();
};

const getLocalizedName = (locale: string, palData?: PalDetails): string => {
  if (!palData) return "Name not available";

  switch (locale) {
    case "de":
    case "de-DE":
      return palData.deName || "Name not available";
    case "en":
    case "en-US":
      return palData.enName || "Name not available";
    case "es-MX":
      return palData.esMxName || "Name not available";
    case "es":
    case "es-ES":
      return palData.esName || "Name not available";
    case "fr":
    case "fr-FR":
      return palData.frName || "Name not available";
    case "id":
    case "id-ID":
      return palData.idName || "Name not available";
    case "it":
    case "it-IT":
      return palData.itName || "Name not available";
    case "ko":
    case "ko-KR":
      return palData.koName || "Name not available";
    case "pl":
    case "pl-PL":
      return palData.plName || "Name not available";
    case "pt":
    case "pt-BR":
      return palData.ptBrName || "Name not available";
    case "ru":
    case "ru-RU":
      return palData.ruName || "Name not available";
    case "th":
    case "th-TH":
      return palData.thName || "Name not available";
    case "tr":
    case "tr-TR":
      return palData.trName || "Name not available";
    case "vi":
    case "vi-VN":
      return palData.viName || "Name not available";
    case "zh-Hans":
      return palData.zhHansName || "Name not available";
    case "zh-Hant":
      return palData.zhHantName || "Name not available";
    case "ja":
    case "ja-JP":
      return palData.jaName || "Name not available";
    default:
      return "Name not available";
  }
};

const roundPercentage = (num: number): string => {
  const percentage = Math.round(num * 10000) / 100;
  return `${percentage}%`;
};

interface PalModalProps {
  isOpen: boolean;
  onClose: () => void;
  palData: PalDetails | undefined;
}

const PalModal: React.FC<PalModalProps> = ({ isOpen, onClose, palData }) => {
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  useEffect(() => {
    const getLocale = async () => {
      const result = await fetchLocale();
      if (result) {
        setCurrentLocale(result);
      } else {
        setCurrentLocale("en-US");
      }
    };

    getLocale();
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#f9f9f9",
          boxShadow: 2,
          p: 2,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {palData && (
          <>
            <Box
              component="img"
              src={palData.image}
              alt={`Image of ${palData.name}`}
              sx={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "1px solid #000",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontSize: "14px", marginBottom: "8px", color: "#333" }}>ID: {palData.id}</Box>

              <Box sx={{ fontSize: "14px", marginBottom: "8px", color: "#333" }}>
                Name: {getLocalizedName(currentLocale, palData)}
              </Box>

              <Box sx={{ fontSize: "14px", marginBottom: "8px", color: "#333" }}>
                Breeding Power: {palData.breedingPower}
              </Box>

              <Box sx={{ fontSize: "14px", marginBottom: "8px", color: "#333" }}>
                ♂: {roundPercentage(palData.probabilityMale)}, ♀: {roundPercentage(palData.probabilityFemale)}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PalModal;
