import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableNativeFeedback,
  useColorScheme,
} from "react-native";
import { View } from "../Themed";
import { useContext } from "react";
import TheContext from "../../app/Context/TheContext";
import Colors from "../../constants/Colors";
import FilterBox from "./../FilterBox";

export default function HeaderRightHome({
  headerType,
}: {
  headerType: "B" | "U";
}) {
  const ColorScheme = useColorScheme();
  const {
    filterQuery,
    isSearch,
    setSearch,
    setFilter,
    isFilter,
    filterQueryB,
    isQueryB,
  } = useContext(TheContext);

  const handleFilter = () => {
    setSearch(false);
    setFilter(!isFilter);
  };

  const handleSearch = () => {
    setFilter(false);
    setSearch(!isSearch);
  };

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.iconBox}>
        <TouchableNativeFeedback onPress={handleSearch}>
          <View style={styles.iconView}>
            {isSearch ? (
              <FontAwesome name="close" size={24} color="red" />
            ) : (
              <Feather
                name="search"
                size={24}
                color={Colors[ColorScheme ?? "light"].text}
              />
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
                <MaterialCommunityIcons name="filter" size={24} color="black" />
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
                <MaterialCommunityIcons name="filter" size={24} color="black" />
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
