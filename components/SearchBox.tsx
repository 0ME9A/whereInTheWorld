import React, { useContext, useEffect, useRef, useState } from "react";
import TheContext from "../app/Context/TheContext";
import {
  StyleSheet,
  TextInput as RNTextInput,
  Animated,
  Keyboard,
} from "react-native";

export default function SearchBox({ searchType }: { searchType: "B" | "U" }) {
  const { isSearch, setQuery, setSearch, setQueryB } = useContext(TheContext);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
  const [searchText, setSearchText] = useState("");

  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSearch ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isSearch) {
      inputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isSearch]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        switch (searchType) {
          case "B":
            setQueryB(searchText);
            break;
          case "U":
            setQuery(searchText);
            break;
          default:
            break;
        }
      }, 300)
    );
  }, [searchText]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    setSearch(false);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <RNTextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search countries by name..."
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmitEditing}
      />
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
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});
