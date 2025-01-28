import { initializeDatabase } from "@/database/initializeDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="teste.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
