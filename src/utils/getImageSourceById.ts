import { usePalContext } from "../features/PalContext/PalContext";

export const getImageSourceById = (id: string): string => {
  const { palList } = usePalContext();
  const foundMapping = palList.find((data) => data.id === id);
  return foundMapping ? foundMapping.image : "";
};
