import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export const getDatabase = async (): Promise<Database> => {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:bcp.db");
  }
  return dbInstance;
};
