import * as SQLite from "expo-sqlite";

import { useColorScheme, View, FlatList, StyleSheet } from "react-native";
import { tintColorLight, tintColorDark } from "../../constants/Colors";
import { useState, useContext, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CountryType } from "../../Types/CountryType";
import { FilterCountries } from "../../functions";

import BookMarkCountryCard from "../../components/BookMarkCountryCard";
import ActiveFilterTab from "../../components/ActiveFilterTab";
import NoCountryRecords from "../../components/NoRecord";
import LoadingScreen from "../../components/Loading";
import SearchBox from "../../components/SearchBox";
import FilterBox from "../../components/FilterBox";
import TheContext from "../Context/TheContext";

const db = SQLite.openDatabase("myDatabase.db");

export default function BookMarks() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookMarkData, setBookMarkData] = useState<CountryType[] | null>(null);
  const [filteredData, setFilteredData] = useState<CountryType[] | null>(null);

  const { allCountries, filterQueryB, isQueryB } = useContext(TheContext);

  const ColorScheme = useColorScheme();
  const cardColor = ColorScheme === "light" ? tintColorLight : tintColorDark;

  const fetchBookmarks = () => {
    setIsLoading(true);
    // Fetch records from the database
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM countries", [], (_, { rows }) => {
        // Filter the allCountries array with the fetched records
        const cca3s = rows._array.map((row: any) => row.cca3);

        if (cca3s.length !== bookMarkData?.length) {
          const filteredCountries =
            allCountries?.filter((country) => cca3s.includes(country.cca3)) ||
            null;
          // Update the bookMarkData state with the filtered data
          setBookMarkData(filteredCountries);
          setIsLoading(false);
        }
      });
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  useEffect(() => {
    const filterCountries = FilterCountries(
      bookMarkData,
      isQueryB,
      filterQueryB
    );
    setFilteredData(filterCountries);
  }, [isQueryB, filterQueryB, bookMarkData]);

  const handleUnbookmark = (country: CountryType) => {
    // Delete the record from the database
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM countries WHERE cca3 = ?", [country.cca3]);
    });
    // Refetch the bookmarks
    fetchBookmarks();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: ColorScheme === "light" ? "#fff" : "#000" },
      ]}
    >
      <SearchBox searchType={"B"} />
      <FilterBox filterType={"B"} />
      <ActiveFilterTab total={filteredData?.length || 0} tabType="B" />

      {!bookMarkData || bookMarkData.length === 0 ? (
        <NoCountryRecords
          title="No BookMarks Found!"
          desc="Please bookmark some countries to show here."
        />
      ) : bookMarkData && (!filteredData || filteredData.length === 0) ? (
        <NoCountryRecords
          title="No Country Found!"
          desc="Please search a different country.."
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, paddingVertical: 5 }}>
              <BookMarkCountryCard
                countryInfo={item}
                color={cardColor}
                onUnbookmark={() => handleUnbookmark(item)}
              />
            </View>
          )}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
