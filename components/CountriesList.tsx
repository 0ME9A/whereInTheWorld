import { tintColorDark, tintColorLight } from "../constants/Colors";
import { useState, useEffect, useContext } from "react";
import { FilterCountries } from "./../functions/index";
import { CountryType } from "../Types/CountryType";
import { Text, View } from "./Themed";
import {
  RefreshControl,
  useColorScheme,
  StyleSheet,
  FlatList,
  Alert,
  TouchableNativeFeedback,
} from "react-native";

import TheContext from "../app/Context/TheContext";
import ActiveFilterTab from "./ActiveFilterTab";
import NoCountryRecords from "./NoRecord";
import CountryCard from "./CountryCard";
import LoadingScreen from "./Loading";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";

export default function CountriesList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<CountryType[] | null>(null);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const { allCountries, setAllCountries, isQuery, filterQuery } =
    useContext(TheContext);

  const ColorScheme = useColorScheme();
  const cardColor = ColorScheme === "light" ? tintColorLight : tintColorDark;

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const json = await response.json();
      setAllCountries(json);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setErrorOccurred(true);
      }, 10000);
    } else {
      setErrorOccurred(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    const filterCountries = FilterCountries(allCountries, isQuery, filterQuery);
    setFilteredData(filterCountries);
  }, [isQuery, filterQuery, allCountries]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {!errorOccurred ? (
          <LoadingScreen />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <NoCountryRecords
              title="Oops! Something went wrong."
              desc={`This could be due to a network error or server unavailability. Please check your internet connection and try again later.`}
            />
            <View
              style={{ borderRadius: 10, overflow: "hidden", marginTop: 10 }}
            >
              <TouchableNativeFeedback onPress={handleRefresh}>
                <View
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor:
                      ColorScheme === "dark" ? tintColorDark : tintColorLight,
                  }}
                >
                  <Text>Refresh</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBox searchType={"U"} />
      <FilterBox filterType={"U"} />
      <ActiveFilterTab total={filteredData?.length || 0} tabType="U" />

      {allCountries && (!filteredData || filteredData.length === 0) ? (
        <NoCountryRecords
          title="No Country Found!"
          desc="Please search a different country..."
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <CountryCard countryInfo={item} color={cardColor} />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
