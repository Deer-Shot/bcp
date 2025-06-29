import { BreedingRecord } from "../../types/BreedingRecord";
import { getDatabase } from "../../utils/db";

const breedingQuery = `
SELECT
    parent1_id AS Parent1ID,
    parent1_gender AS Parent1Gender,
    parent2_id AS Parent2ID,
    parent2_gender AS Parent2Gender,
    child_id AS ChildID 
FROM
    breeding 
WHERE
    parent1_id = $1
`;

export const fetchBreedingRecords = async (selectedImage: string | null): Promise<BreedingRecord[]> => {
  try {
    const databaseInstance = await getDatabase();
    const retrievedRecords = await databaseInstance.select<BreedingRecord[]>(breedingQuery, [selectedImage]);
    return retrievedRecords;
  } catch (error) {
    console.error("Error during DB retrieval:", error);
    throw error;
  }
};
