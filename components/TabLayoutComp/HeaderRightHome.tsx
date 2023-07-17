import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { BlackWhite } from "../../constants/Colors";
import { useContext } from "react";
import { View } from "../Themed";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import TheContext from "../../app/Context/TheContext";

export default function HeaderRightHome({
  headerType,
}: {
  headerType: "B" | "U";
}) {
  const {
    filterQuery,
    isSearch,
    setSearch,
    setFilter,
    isFilter,
    filterQueryB,
  } = useContext(TheContext);

  const handleFilter = () => {
    setSearch(false);
    setFilter(!isFilter);
  };

  const handleSearch = () => {
    setFilter(false);
    setSearch(!isSearch);
  };

  const BW = BlackWhite(true);

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.iconBox}>
        <TouchableNativeFeedback onPress={handleSearch}>
          <View style={styles.iconView}>
            {isSearch ? (
              <FontAwesome name="close" size={24} color="red" />
            ) : (
              <Feather name="search" size={24} color={BW} />
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.divider} />
      <View style={styles.iconBox}>
        <TouchableNativeFeedback onPress={handleFilter}>
          {headerType === "B" ? (
            <View style={styles.iconView}>
              {filterQueryB === "All" ? (
                <MaterialCommunityIcons name="filter" size={24} color={BW} />
              ) : (
                <MaterialCommunityIcons
                  name="filter-remove"
                  size={24}
                  color="red"
                />
              )}
            </View>
          ) : (
            <View style={styles.iconView}>
              {filterQuery === "All" ? (
                <MaterialCommunityIcons name="filter" size={24} color={BW} />
              ) : (
                <MaterialCommunityIcons
                  name="filter-remove"
                  size={24}
                  color="red"
                />
              )}
            </View>
          )}
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
    backgroundColor: "transparent",
  },
  iconBox: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  iconView: {
    padding: 10,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  divider: {
    width: 2,
    height: "30%",
    opacity: 0.2,
    backgroundColor: "#717F89",
  },
});
