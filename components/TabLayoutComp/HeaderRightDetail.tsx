import * as SQLite from "expo-sqlite";

import { TouchableNativeFeedback, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "../Themed";

const db = SQLite.openDatabase("myDatabase.db");

export default function HeaderRightDetail({ id }: { id: string }) {
  const [BookMarks, setBookMarks] = useState(false);

  const fetchBookmarks = () => {
    // Check if the record exists
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM countries WHERE cca3 = ?",
        [id],
        (_, { rows }) => {
          const isBookmarked = rows._array.filter((item) => item.cca3 === id);

          // The record exists, set the BookMarks state to true else false
          if (isBookmarked.length > 0) {
            setBookMarks(true);
          } else {
            setBookMarks(false);
          }
        }
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  const handlePress = () => {
    setBookMarks(!BookMarks);
    if (!BookMarks) {
      // Create the record
      db.transaction((tx) => {
        tx.executeSql("INSERT INTO countries (cca3) VALUES (?)", [id]);
      });
    } else {
      // Delete the record
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM countries WHERE cca3 = ?", [id]);
      });
    }
  };

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.iconBox}>
        <TouchableNativeFeedback onPress={handlePress}>
          <View style={styles.iconView}>
            {BookMarks ? (
              <Ionicons name="ios-bookmarks" size={24} color="black" />
            ) : (
              <Ionicons name="ios-bookmarks-outline" size={24} color="black" />
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  iconBox: {
    borderRadius: 10,
    overflow: "hidden",
  },
  iconView: {
    padding: 10,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 2,
    height: "30%",
    opacity: 0.2,
    backgroundColor: "#717F89",
  },
});
