import { BreedingRecord } from "../../types/BreedingRecord";
import { getDatabase } from "../../utils/db";

const breedingQuery = `
SELECT
    parent1_id Parent1ID
    , parent1_gender Parent1Gender
    , parent2_id Parent2ID
    , parent2_gender Parent2Gender
    , child_id ChildID 
FROM
    breeding 
WHERE
    parent1_id = $1 AND parent2_id = $2
    
`;

export const fetchBreedingRecords = async (
  selectedImage1: string | null,
  selectedImage2: string | null
): Promise<BreedingRecord[]> => {
  if (!selectedImage1 || !selectedImage2) {
    return [];
  }

  try {
    const databaseInstance = await getDatabase();
    const retrievedRecords = await databaseInstance.select<BreedingRecord[]>(breedingQuery, [
      selectedImage1,
      selectedImage2,
    ]);
    return retrievedRecords;
  } catch (error) {
    console.error("Error during DB retrieval:", error);
    throw error;
  }
};
