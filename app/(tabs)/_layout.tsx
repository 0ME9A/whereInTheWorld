import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Text, View } from "../../components/Themed";
import { useColorScheme } from "react-native";

import HeaderRightDetail from "../../components/TabLayoutComp/HeaderRightDetail";
import HeaderRightHome from "../../components/TabLayoutComp/HeaderRightHome";
import CountryInfo from "../SubTabs/CountryInfo";
import TermsOfService from "./TermsOfService";
import Colors from "../../constants/Colors";
import PrivacyPolicy from "./PrivacyPolicy";
import BookMarks from "./Bookmarks";
import Profile from "./Profile";
import Index from ".";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const BookmarksStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function BookmarksStackScreen() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen
        name="Bookmarks"
        component={BookMarks}
        options={{
          title: "Bookmarks",
          headerRight: () => <HeaderRightHome headerType={"B"} />,
        }}
      />
    </BookmarksStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Discover Earth"
        component={Index}
        options={{
          headerTitle: "",
          headerRight: () => <HeaderRightHome headerType={"U"} />,
          headerLeft: () => (
            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontWeight: "700", fontSize: 18}}>Discover Earth</Text>
              <Text style={{fontSize: 10}}>Where in the world?</Text>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CountryInfo"
        component={CountryInfo}
        options={({ route }: any) => ({
          title: "Details",
          headerRight: () => (
            <HeaderRightDetail id={route?.params?.id || null} />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={"Profile"}
        component={Profile}
        options={{
          headerTitle: "",
          headerRight: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <ProfileStack.Screen
        name={"PrivacyPolicy"}
        component={PrivacyPolicy}        
        options={{
          headerTitle: "Privacy Policy",
        }}
      />
      <ProfileStack.Screen
        name={"TermsOfService"}
        component={TermsOfService}        
        options={{
          headerTitle: "Terms of Service",
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home1"
      activeColor="#717F89"
      barStyle={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
      shifting={true}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color={"black"} />
            ) : (
              <Ionicons name="md-home-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="BookmarksScreen"
        component={BookmarksStackScreen}
        options={{
          tabBarLabel: "Bookmarks",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-bookmarks" size={24} color="black" />
            ) : (
              <Ionicons name="ios-bookmarks-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            ) : (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
