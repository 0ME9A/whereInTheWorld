import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("myDatabase.db");

// Create a table
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS countries (id INTEGER PRIMARY KEY AUTOINCREMENT, cca3 TEXT);"
    );
  });
};

// Insert a record
const insertCountry = (cca3: string) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO countries (cca3) VALUES (?)", [cca3]);
  });
};

// Update a record
const updateCountry = (id: number, cca3: string) => {
  db.transaction((tx) => {
    tx.executeSql("UPDATE countries SET cca3 = ? WHERE id = ?", [cca3, id]);
  });
};

// Delete a record
const deleteCountry = (id: number) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM countries WHERE id = ?", [id]);
  });
};
