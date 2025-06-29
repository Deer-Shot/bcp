import breedingData from "../../assets/data/breeding.json";
import dbData from "../../assets/data/db.json";
import { getDatabase } from "../../utils/db";
import { Count } from "./Count";
import { Pal } from "./Pal";
import { Probability } from "./Probability";

const generatePalsWithProbabilities = (database: typeof dbData): Pal[] => {
  const formattedPals: Pal[] = database.Pals.map((pal) => ({
    Id: pal.Id.PalDexNo.toString().padStart(3, "0") + (pal.Id.IsVariant ? "B" : ""),
    Name: pal.Name,
    InternalName: pal.InternalName,
    DeName: pal.LocalizedNames.de,
    EnName: pal.LocalizedNames.en,
    EsMxName: pal.LocalizedNames["es-mx"],
    EsName: pal.LocalizedNames.es,
    FrName: pal.LocalizedNames.fr,
    IdName: pal.LocalizedNames.id,
    ItName: pal.LocalizedNames.it,
    KoName: pal.LocalizedNames.ko,
    PlName: pal.LocalizedNames.pl,
    PtBrName: pal.LocalizedNames["pt-br"],
    RuName: pal.LocalizedNames.ru,
    ThName: pal.LocalizedNames.th,
    TrName: pal.LocalizedNames.tr,
    ViName: pal.LocalizedNames.vi,
    ZhHansName: pal.LocalizedNames["zh-hans"],
    ZhHantName: pal.LocalizedNames["zh-hant"],
    JaName: pal.LocalizedNames.ja,
    BreedingPower: pal.BreedingPower,
  }));

  const probabilities: Probability[] = Object.entries(database.BreedingGenderProbability).map(([key, values]) => ({
    InternalName: key,
    ProbabilityMale: values.MALE,
    ProbabilityFemale: values.FEMALE,
  }));

  interface ProbabilityMap {
    [key: string]: Probability;
  }
  const probabilityMap: ProbabilityMap = probabilities.reduce((acc: ProbabilityMap, prob: Probability) => {
    acc[prob.InternalName] = prob;
    return acc;
  }, {});

  return formattedPals
    .filter((pal) => pal.Id !== "013B")
    .map((pal) => Object.assign(pal, probabilityMap[pal.InternalName] || { ProbabilityMale: 0, ProbabilityFemale: 0 }));
};

const formatBreedingRecords = (breeding: typeof breedingData) => {
  const breedingPairs = breeding.Breeding.flatMap((record) => {
    const parent1 = {
      id: record.Parent1ID.PalDexNo.toString().padStart(3, "0") + (record.Parent1ID.IsVariant ? "B" : ""),
      gender: record.Parent1Gender,
    };
    const parent2 = {
      id: record.Parent2ID.PalDexNo.toString().padStart(3, "0") + (record.Parent2ID.IsVariant ? "B" : ""),
      gender: record.Parent2Gender,
    };
    const child = {
      id: record.ChildID.PalDexNo.toString().padStart(3, "0") + (record.ChildID.IsVariant ? "B" : ""),
    };

    const forwardBreedingRecord = {
      Parent1Id: parent1.id,
      Parent1Gender: parent1.gender,
      Parent2Id: parent2.id,
      Parent2Gender: parent2.gender,
      ChildId: child.id,
    };

    const reverseBreedingRecord = {
      Parent1Id: parent2.id,
      Parent1Gender: parent2.gender,
      Parent2Id: parent1.id,
      Parent2Gender: parent1.gender,
      ChildId: child.id,
    };

    return [forwardBreedingRecord, reverseBreedingRecord];
  });

  const filteredBreedingPairs = breedingPairs.filter(
    (record) => record.Parent1Id !== "013B" && record.Parent2Id !== "013B" && record.ChildId !== "013B"
  );

  return Array.from(
    new Map(
      filteredBreedingPairs.map((record) => [
        `${record.Parent1Id}-${record.Parent1Gender}-${record.Parent2Id}-${record.Parent2Gender}-${record.ChildId}`,
        record,
      ])
    ).values()
  );
};

export const initializeDatabase = async () => {
  try {
    const sqliteDb = await getDatabase();

    const [palCount, breedingCount] = await Promise.all([
      sqliteDb.select<Count[]>(`SELECT COUNT(*) AS count FROM pal`),
      sqliteDb.select<Count[]>(`SELECT COUNT(*) AS count FROM breeding`),
    ]);

    if (palCount[0].count === 214 && breedingCount[0].count === 45798) {
      return;
    }

    await sqliteDb.execute("DELETE FROM pal");
    await sqliteDb.execute("DELETE FROM breeding");

    const enrichedPals = generatePalsWithProbabilities(dbData);
    const breedingRecords = formatBreedingRecords(breedingData);

    for (const pal of enrichedPals) {
      await sqliteDb.execute(
        `INSERT INTO pal 
         (id, name, internal_name, de_name, en_name, es_mx_name, es_name, fr_name, id_name, it_name, ko_name, pl_name, pt_br_name, ru_name, th_name, tr_name, vi_name, zh_hans_name, zh_hant_name, ja_name, breeding_power, probability_male, probability_female) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(pal)
      );
    }

    const batchSize = 42;
    for (let i = 0; i < breedingRecords.length; i += batchSize) {
      const batch = breedingRecords.slice(i, i + batchSize);
      const values = batch.map(() => "(?, ?, ?, ?, ?)").join(", ");
      const parameters = batch.flatMap(Object.values);

      await sqliteDb.execute(
        `INSERT INTO breeding (parent1_id, parent1_gender, parent2_id, parent2_gender, child_id) VALUES ${values}`,
        parameters
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database initialization failed:", error.stack);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};
