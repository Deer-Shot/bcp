import { PalDetails } from "../../types/PalDetails";
import { getDatabase } from "../../utils/db";

export const fetchPalData = async (): Promise<PalDetails[]> => {
  const db = await getDatabase();
  const palRecords = await db.select<PalDetails[]>(
    "SELECT id AS id, name AS name, internal_name AS internalName, de_name AS deName, en_name AS enName, es_mx_name AS esMxName, es_name AS esName, fr_name AS frName, id_name AS idName, it_name AS itName, ko_name AS koName, pl_name AS plName, pt_br_name AS ptBrName, ru_name AS ruName, th_name AS thName, tr_name AS trName, vi_name AS viName, zh_hans_name AS zhHansName, zh_hant_name AS zhHantName, ja_name AS jaName, breeding_power AS breedingPower, probability_male AS probabilityMale, probability_female AS probabilityFemale FROM pal"
  );

  const imageFiles = Object.entries(import.meta.glob("../../assets/data/Pals/*.avif", { eager: true })).map(
    ([filePath, image]: any) => ({
      src: image.default || "",
      name:
        filePath
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "") || "",
    })
  );

  const mappedPalList = palRecords.map((record) => {
    const matchingImage = imageFiles.find((img) => img.name.toLowerCase().trim() === record.name.toLowerCase().trim());
    return {
      ...record,
      image: matchingImage?.src || "no_image_available",
    };
  });

  const sortedPalList = mappedPalList.sort((a, b) => a.id.localeCompare(b.id));

  sortedPalList.forEach((item) => {
    if (item.image !== "no_image_available") {
      const img = new Image();
      img.src = item.image;
    }
  });

  return sortedPalList;
};
