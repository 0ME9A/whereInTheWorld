import { useContext, useState, useEffect } from "react";
import { View, Text } from "../../../components/Themed";
import { CountryType } from "../../../Types/CountryType";
import { blurhash } from "../../../constants/BlurHash";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import LoadingScreen from "../../../components/Loading";
import TheContext from "../../Context/TheContext";
import Border from "../../../components/Border";

export default function CountryInfo({ route }: any) {
  const [CD, setCD] = useState<CountryType | null>(null);
  const { allCountries } = useContext(TheContext);
  const { id } = route.params;

  useEffect(() => {
    const filterCountry =
      allCountries && allCountries.filter((item) => item.cca3 === id);

    filterCountry && setCD(filterCountry[0]);
  }, [route]);

  if (!CD) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }
  const objLoop = (param: any, deepParam = "") => {
    let obj: string | undefined = undefined;
    for (const key in param) {
      if (Object.hasOwnProperty.call(param, key)) {
        const element = param[key];
        if (deepParam === "") {
          obj = obj + ", " + element;
        } else {
          obj = obj + ", " + element[deepParam];
        }
      }
    }
    obj = obj?.replace("undefined,", "");
    return obj;
  };

  const native = CD.name.nativeName
    ? objLoop(CD.name.nativeName, "common")
    : "N/A";
  const currencyNames = CD.currencies
    ? Object.values(CD.currencies)
        .map((currency) => currency.name)
        .join(", ")
    : "N/A";
  const languages = CD.languages ? objLoop(CD.languages) : "N/A";

  return (
    <View style={styles.container}>
      <Image
        style={styles.cardThumb}
        source={CD.flags.png}
        placeholder={blurhash}
        transition={1000}
        contentFit="cover"
      />
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{CD.name.common}</Text>
        <Text style={styles.textTitle}>
          Native Name: <Text style={styles.text}>{native}</Text>
        </Text>
        <Text style={styles.textTitle}>
          Population: <Text style={styles.text}>{CD.population || "N/A"}</Text>
        </Text>
        <Text style={styles.textTitle}>
          Sub Region: <Text style={styles.text}>{CD.subregion || "N/A"}</Text>
        </Text>
        <Text style={styles.textTitle}>
          Capital: <Text style={styles.text}>{CD.capital || "N/A"}</Text>
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textTitle}>
            Top Level Domain:{" "}
            <Text style={styles.text}>{CD.tld.toString() || "N/A"}</Text>
          </Text>
          <Text style={styles.textTitle}>
            Currencies: <Text style={styles.text}>{currencyNames}</Text>
          </Text>
          <Text style={styles.textTitle}>
            Languages: <Text style={styles.text}>{languages}</Text>
          </Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={styles.textTitle}>Borders: </Text>
            {CD.borders ? (
              CD.borders.map((item) => (
                <Border countryCode3={item} key={item} />
              ))
            ) : (
              <Border countryCode3={false} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "300",
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  cardThumb: {
    width: "100%",
    aspectRatio: 1 / 0.5,
    backgroundColor: "#717F89",
  },
});
