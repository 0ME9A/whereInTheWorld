import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import countriesWithCode from "../assets/Data/countriesData";

type RootStackParamList = {
  CountryInfo: { id: string };
  // Define other screens and their params here
};
type CountryCardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CountryInfo"
>;

export default function Border({
  countryCode3,
}: {
  countryCode3: string | false;
}) {
  const navigation = useNavigation<CountryCardScreenNavigationProp>();
  const cca3 = countryCode3;

  const borderFullName =
    cca3 && countriesWithCode.filter((item) => item.alpha_3 === cca3);

  const handlePress = () => {
    cca3 && navigation.navigate("CountryInfo", { id: cca3 });
  };

  if (!countryCode3 || !borderFullName) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.border}>No Borders</Text>
      </TouchableOpacity>
    );
  }

  if (borderFullName.length > 0) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.border}>{borderFullName[0].name}</Text>
      </TouchableOpacity>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  border: {
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
