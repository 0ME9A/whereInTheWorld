import React, { useContext, useEffect, useRef, useState } from "react";
import Colors, { BlackWhite, ColorSwitch } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Animated,
  Keyboard,
  TextInput,
  Text,
  BackHandler,
} from "react-native";

import TheContext from "../app/Context/TheContext";

export default function SearchBox({ searchType }: { searchType: "B" | "U" }) {
  const { isSearch, setQuery, setSearch, setQueryB } = useContext(TheContext);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
  const [searchText, setSearchText] = useState("");

  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput | null>(null);
  const CS = ColorSwitch(Colors.dark.background, "white");
  const BW = BlackWhite(true, 0.5);

  const handleBackPress = () => {
    if (isSearch) {
      setSearch(false);
      Keyboard.dismiss();
      return true; // Prevent the default back button behavior
    }
    return false; // Allow the default back button behavior
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    setSearch(false);
  };

  const makeKeyboardActive = () => {
    if (isSearch && !Keyboard.isVisible()) {
      inputRef.current?.blur();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSearch ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isSearch) {
      Keyboard.dismiss();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Delay the focus to ensure keyboard activation
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }], backgroundColor: CS },
      ]}
    >
      {isSearch && (
        <>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSubmitEditing}
          />

          <TouchableOpacity
            onPress={makeKeyboardActive}
            style={[
              styles.inputContainer,
              { backgroundColor: CS, borderColor: BW },
            ]}
          >
            {searchText ? (
              <Text style={[styles.inputText, { color: BW }]}>
                {searchText}
              </Text>
            ) : (
              <Text style={[styles.placeholderText, { color: BW }]}>
                Search countries by name...
              </Text>
            )}
          </TouchableOpacity>
        </>
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
  hiddenInput: {
    position: "absolute",
    top: -9999, // Place the input off-screen to hide it from the user
  },
  inputContainer: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    padding: 5,
  },
  inputText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    opacity: 0.5,
  },
});

// import React, { useContext, useEffect, useRef, useState } from "react";
// import Colors, { BlackWhite, ColorSwitch } from "../constants/Colors";
// import {
//   TextInput as RNTextInput,
//   StyleSheet,
//   Animated,
//   Keyboard,
// } from "react-native";

// import TheContext from "../app/Context/TheContext";

// export default function SearchBox({ searchType }: { searchType: "B" | "U" }) {
//   const { isSearch, setQuery, setSearch, setQueryB } = useContext(TheContext);

//   const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
//   const [searchText, setSearchText] = useState("");

//   const animation = useRef(new Animated.Value(0)).current;
//   const inputRef = useRef<RNTextInput>(null);

//   useEffect(() => {
//     Animated.timing(animation, {
//       toValue: isSearch ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     if (isSearch) {
//       inputRef.current?.focus();
//     } else {
//       Keyboard.dismiss();
//     }
//   }, [isSearch]);

//   useEffect(() => {
//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }

//     setDebounceTimeout(
//       setTimeout(() => {
//         switch (searchType) {
//           case "B":
//             setQueryB(searchText);
//             break;
//           case "U":
//             setQuery(searchText);
//             break;
//           default:
//             break;
//         }
//       }, 300)
//     );
//   }, [searchText]);

//   const translateY = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-100, 0],
//   });

//   const handleSubmitEditing = () => {
//     Keyboard.dismiss();
//     setSearch(false);
//   };

//   const CS = ColorSwitch(Colors.dark.background, "white");
//   const BW = BlackWhite(true, 0.5);

//   return (
//     <Animated.View
//       style={[
//         styles.container,
//         { transform: [{ translateY }], backgroundColor: CS },
//       ]}
//     >
//       <RNTextInput
//         ref={inputRef}
//         style={[
//           styles.input,
//           { borderColor: BW, backgroundColor: "transparent", color: BW },
//         ]}
//         placeholder="Search countries by name..."
//         placeholderTextColor={BW}
//         onChangeText={setSearchText}
//         onSubmitEditing={handleSubmitEditing}
//       />
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//     padding: 10,
//   },
//   input: {
//     height: 40,
//     padding: 10,
//     fontSize: 16,
//     borderRadius: 5,
//     borderWidth: 2,
//   },
// });
