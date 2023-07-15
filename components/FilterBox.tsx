import { tintColorDark, tintColorLight } from "../constants/Colors";
import { useContext, useEffect, useRef } from "react";
import { View } from "./Themed";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";

import TheContext from "../app/Context/TheContext";
import { filterType } from "../Types/FilterType";

const filters: filterType[] = [
  "All",
  "Africa",
  "Americas",
  "Antarctic",
  "Asia",
  "Europe",
  "Oceania",
];

export default function FilterBox({ filterType }: { filterType: "B" | "U" }) {
  const {
    isFilter,
    setFilter,
    setFilterQuery,
    setFilterQueryB,
    filterQuery,
    filterQueryB,
  } = useContext(TheContext);
  const animation = useRef(new Animated.Value(0)).current;
  const ColorScheme = useColorScheme();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFilter ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFilter]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });

  const handleFilter = (filterItem: filterType) => {
    setFilter(false);
    if (filterType === "B") setFilterQueryB(filterItem);
    if (filterType === "U") setFilterQuery(filterItem);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: ColorScheme === "light" ? "white" : "black",
        },
      ]}
    >
      {filterType === "B" && (
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filter,
                {
                  backgroundColor:
                    filter === filterQueryB
                      ? ColorScheme === "light"
                        ? tintColorLight
                        : tintColorDark
                      : "white",
                },
              ]}
              onPress={() => handleFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {filterType === "U" && (
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filter,
                {
                  backgroundColor:
                    filter === filterQuery
                      ? ColorScheme === "light"
                        ? tintColorLight
                        : tintColorDark
                      : "white",
                },
              ]}
              onPress={() => handleFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  filterContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    padding: 5,
    borderRadius: 10,
  },
  filter: {
    padding: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 16,
  },
});
