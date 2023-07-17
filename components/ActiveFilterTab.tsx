import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { useContext } from "react";
import Colors, {
  BlackWhite,
  ColorSwitch,
  tintColorLightDark,
} from "../constants/Colors";

import TheContext from "../app/Context/TheContext";

export default function ActiveFilterTab({
  total = 0,
  tabType,
}: {
  total: number;
  tabType: "B" | "U";
}) {
  const {
    setFilterQuery,
    filterQuery,
    setQuery,
    isQuery,
    filterQueryB,
    isQueryB,
    setQueryB,
    setFilterQueryB,
  } = useContext(TheContext);

  const BW = BlackWhite(true);
  const CS = ColorSwitch(Colors.dark.background, "#fff");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CS,
      }}
    >
      <View
        style={[
          styles.tab,
          {
            borderWidth: 0,
            gap: 10,
          },
        ]}
      >
        <Text style={{ fontWeight: "bold", color: BW, paddingLeft: 10 }}>
          {total}
        </Text>
        <View style={styles.divider} />
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{ alignItems: "flex-start" }}
      >
        <View style={styles.container}>
          {tabType === "B" && (
            <TouchableOpacity
              onPress={() => setFilterQueryB("All")}
              style={styles.tabWrapper}
            >
              <View
                style={[
                  styles.tab,
                  {
                    borderColor: filterQueryB !== "All" ? "red" : BW,
                  },
                ]}
              >
                <Text>Region:- {filterQueryB}</Text>
                {filterQueryB !== "All" && (
                  <Ionicons name="close" size={16} color="red" />
                )}
              </View>
            </TouchableOpacity>
          )}
          {tabType === "U" && (
            <TouchableOpacity
              onPress={() => setFilterQuery("All")}
              style={styles.tabWrapper}
            >
              <View
                style={[
                  styles.tab,
                  {
                    borderColor: filterQuery !== "All" ? "red" : BW,
                  },
                ]}
              >
                <Text>Region:- {filterQuery}</Text>
                {filterQuery !== "All" && (
                  <Ionicons name="close" size={16} color="red" />
                )}
              </View>
            </TouchableOpacity>
          )}

          {tabType === "B" && isQueryB && (
            <TouchableOpacity
              onPress={() => setQueryB(null)}
              style={styles.tabWrapper}
            >
              <View style={[styles.tab, { borderColor: "red" }]}>
                <Text>Search:- {isQueryB}</Text>
                <Ionicons name="close" size={16} color="red" />
              </View>
            </TouchableOpacity>
          )}
          {tabType === "U" && isQuery && (
            <TouchableOpacity
              onPress={() => setQuery(null)}
              style={styles.tabWrapper}
            >
              <View style={[styles.tab, { borderColor: "red" }]}>
                <Text>Search:- {isQuery}</Text>
                <Ionicons name="close" size={16} color="red" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    gap: 5,
    paddingLeft: 0,
  },
  tabWrapper: {
    alignSelf: "flex-start",
  },
  tab: {
    flexDirection: "row",
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    gap: 5,
  },
  divider: {
    width: 2,
    height: 20,
    backgroundColor: tintColorLightDark,
    opacity: 0.2,
  },
});
