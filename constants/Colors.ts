import { useColorScheme } from "react-native";

export const tintColorLightDark = "#717F89";
export const tintColorLight = "#F4FBFF";
export const tintColorDark = "#212E37";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#19252e",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const ColorSwitch = (dark: string, light: string) => {
  const ColorScheme = useColorScheme();
  return ColorScheme === "dark" ? dark : light;
};

export const BlackWhite = (blackWhite: boolean, opacity: number = 1) => {
  const ColorScheme = useColorScheme();
  if (blackWhite) {
    return ColorScheme === "dark"
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`;
  } else {
    return ColorScheme === "dark"
      ? `rgba(0, 0, 0, ${opacity})`
      : `rgba(255, 255, 255, ${opacity})`;
  }
};
