import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { CountryType } from "../Types/CountryType";
import { Image } from "expo-image";

type RootStackParamList = {
  CountryInfo: { id: string };
};

type CountryCardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CountryInfo"
>;

export default function CountryCard({
  countryInfo,
  color,
}: {
  countryInfo: CountryType;
  color: string;
}) {
  const navigation = useNavigation<CountryCardScreenNavigationProp>();

  const handleRoute = () => {
    navigation.navigate("CountryInfo", { id: countryInfo.cca3 });
  };

  return (
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <TouchableNativeFeedback onPress={handleRoute}>
        <View
          style={[
            styles.cardBox,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Image
            source={{ uri: countryInfo.flags.png }}
            style={styles.cardThumb}
            contentFit="cover"
          />
          <View style={{ padding: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {countryInfo.name.common}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subTitle}>
                Population : {countryInfo.population}
              </Text>
              <Text style={styles.subTitle}>Region : {countryInfo.region}</Text>
              <Text style={styles.subTitle}>
                Capital : {countryInfo.capital}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    width: "100%",
    borderRadius: 10,
  },
  cardThumb: {
    width: "100%",
    aspectRatio: 1 / 0.5,
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.6,
  },
});
