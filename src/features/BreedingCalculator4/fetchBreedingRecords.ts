import { BreedingRecord } from "../../types/BreedingRecord";
import { getDatabase } from "../../utils/db";

const initialBreedingsQuery = `
SELECT
    parent1_id AS Parent1ID,
    parent1_gender AS Parent1Gender,
    parent2_id AS Parent2ID,
    parent2_gender AS Parent2Gender,
    child_id AS ChildID
FROM
    breeding
WHERE parent1_id = $1
    AND child_id = $2
`;

const breedingsWithParent3And4Query = `
SELECT
    b1.parent1_id AS Parent1ID
    , b1.parent1_gender AS Parent1Gender
    , b1.parent2_id AS Parent2ID
    , b1.parent2_gender AS Parent2Gender
    , b2.parent1_id AS Parent3ID
    , b2.parent1_gender AS Parent3Gender
    , b2.parent2_id AS Parent4ID
    , b2.parent2_gender AS Parent4Gender
    , b2.child_id AS ChildID 
FROM
    breeding b1 
    INNER JOIN breeding b2 
        ON b1.child_id = b2.parent1_id 
        AND b2.parent2_id != $2
WHERE
    b1.parent1_id = $1 
    AND b2.child_id = $2
`;

const breedingsWithParent5And6Query = `
SELECT
    b1.parent1_id AS Parent1ID
    , b1.parent1_gender AS Parent1Gender
    , b1.parent2_id AS Parent2ID
    , b1.parent2_gender AS Parent2Gender
    , b2.parent1_id AS Parent3ID
    , b2.parent1_gender AS Parent3Gender
    , b2.parent2_id AS Parent4ID
    , b2.parent2_gender AS Parent4Gender
    , b3.parent1_id AS Parent5ID
    , b3.parent1_gender AS Parent5Gender
    , b3.parent2_id AS Parent6ID
    , b3.parent2_gender AS Parent6Gender
    , b3.child_id AS ChildID 
FROM
    breeding b1 
    INNER JOIN breeding b2 
        ON b1.child_id = b2.parent1_id 
        AND b2.parent2_id != $2 
    INNER JOIN breeding b3 
        ON b2.child_id = b3.parent1_id 
        AND b3.parent2_id != $2 
WHERE
    b1.parent1_id = $1 
    AND b3.child_id = $2
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
    const initialBreedings = await databaseInstance.select<BreedingRecord[]>(initialBreedingsQuery, [
      selectedImage1,
      selectedImage2,
    ]);

    if (initialBreedings.length > 0) {
      return initialBreedings;
    }

    const breedingsWithParent3And4 = await databaseInstance.select<BreedingRecord[]>(breedingsWithParent3And4Query, [
      selectedImage1,
      selectedImage2,
    ]);

    if (breedingsWithParent3And4.length > 0) {
      return breedingsWithParent3And4;
    }

    const breedingsWithParent5And6 = await databaseInstance.select<BreedingRecord[]>(breedingsWithParent5And6Query, [
      selectedImage1,
      selectedImage2,
    ]);

    return breedingsWithParent5And6;
  } catch (error) {
    console.error("Error during DB retrieval:", error);
    throw error;
  }
};
