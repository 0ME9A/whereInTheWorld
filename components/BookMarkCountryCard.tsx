import { StackNavigationProp } from "@react-navigation/stack";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import { CountryType } from "../Types/CountryType";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

import Swipeable from "react-native-gesture-handler/Swipeable";

type RootStackParamList = {
  CountryInfo: { id: string };
};

type CountryCardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CountryInfo"
>;

type BookMarkCountryCardProps = {
  countryInfo: CountryType;
  color: string;
  onUnbookmark: (country: CountryType) => void;
};

export default function BookMarkCountryCard({
  countryInfo,
  color,
  onUnbookmark,
}: BookMarkCountryCardProps) {
  const navigation = useNavigation<CountryCardScreenNavigationProp>();

  const handleRoute = () => {
    navigation.navigate("CountryInfo", { id: countryInfo.cca3 });
  };

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.leftAction}>
        <Text style={styles.actionText}>Remove</Text>
      </RectButton>
    );
  };

  return (
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <Swipeable
        renderRightActions={renderLeftActions}
        onSwipeableOpen={() => onUnbookmark(countryInfo)}
      >
        <TouchableNativeFeedback onPress={handleRoute}>
          <View style={styles.cardBox}>
            <View style={{ padding: 10, backgroundColor: color }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {countryInfo.name.common}
              </Text>
              <View style={{ backgroundColor: "transparent" }}>
                <Text style={styles.subTitle}>
                  Region : {countryInfo.region}
                </Text>
                <Text style={styles.subTitle}>
                  Capital : {countryInfo.capital}
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    borderRadius: 10,
    overflow: "hidden",
    height: "auto",
    width: "100%",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.6,
  },
  leftAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
