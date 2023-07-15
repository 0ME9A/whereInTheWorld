import { View, Animated, StyleSheet, useColorScheme } from "react-native";
import { tintColorDark, tintColorLight } from "../constants/Colors";

export default function LoadingScreen() {
  const translateX = new Animated.Value(0);
  const colorScheme = useColorScheme();

  const leftToRightAnimation = Animated.timing(translateX, {
    toValue: 500,
    duration: 300,
    useNativeDriver: true,
  });

  const rightToLeftAnimation = Animated.timing(translateX, {
    toValue: 0,
    duration: 0,
    useNativeDriver: true,
  });

  Animated.loop(
    Animated.sequence([
      leftToRightAnimation,
      Animated.delay(500),
      rightToLeftAnimation,
    ])
  ).start();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === "dark" ? tintColorDark : tintColorLight,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animationContainer,
          {
            transform: [{ translateX }],
            opacity: translateX.interpolate({
              inputRange: [0, 500],
              outputRange: [500, 1],
            }),
            backgroundColor: "red",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "30%",
    borderRadius: 10,
    justifyContent: "center",
  },
  animationContainer: {
    width: 50,
    height: 5,
  },
});
