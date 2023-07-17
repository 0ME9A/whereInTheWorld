import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Text, View } from "../../components/Themed";
import { ReactElement } from "react";
import Colors, {
  BlackWhite,
  ColorSwitch,
  tintColorDark,
  tintColorLight,
} from "../../constants/Colors";

import BookmarksStackScreen from "../StackScreens/BookmarksStackScreen";
import ProfileStackScreen from "../StackScreens/ProfileStackScreen";
import HomeStackScreen from "../StackScreens/HomeStackScreen";

const Tab = createBottomTabNavigator();

const TabBarIconStyle = (
  active: boolean,
  icon: ReactElement,
  activeIcon: ReactElement
) => {
  const CsBadge = ColorSwitch(tintColorDark, tintColorLight);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        padding: 0,
        borderRadius: 50,
        position: "relative",
        overflow: "hidden",
        top: active ? 0 : 5,
      }}
    >
      <View
        style={{
          backgroundColor: CsBadge,
          position: "absolute",
          width: "100%",
          height: "100%",
          left: -28,
          bottom: active ? 0 : -50,
        }}
      />
      {active ? activeIcon : icon}
    </View>
  );
};

export default function TabLayout() {
  const CS = ColorSwitch(Colors.dark.background, "white");
  const BW = BlackWhite(true);

  return (
    <Tab.Navigator
      initialRouteName="Home1"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: CS,
          paddingBottom: 5,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12, bottom: 3 }}>Home</Text>
            ) : (
              <Text />
            ),

          tabBarIcon: ({ focused }) =>
            TabBarIconStyle(
              focused,
              <Ionicons name="md-home-outline" size={24} color={BW} />,
              <Ionicons name="home" size={24} color={BW} />
            ),
        }}
      />
      <Tab.Screen
        name="BookmarksScreen"
        component={BookmarksStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12, bottom: 3 }}>BookMarks</Text>
            ) : (
              <Text />
            ),
          tabBarIcon: ({ focused }) =>
            TabBarIconStyle(
              focused,
              <Ionicons name="ios-bookmarks-outline" size={24} color={BW} />,
              <Ionicons name="ios-bookmarks" size={24} color={BW} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12, bottom: 3 }}>About</Text>
            ) : (
              <Text />
            ),
          tabBarIcon: ({ focused }) =>
            TabBarIconStyle(
              focused,
              <FontAwesome5 name="user" size={24} color={BW} />,
              <FontAwesome5 name="user-alt" size={24} color={BW} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
