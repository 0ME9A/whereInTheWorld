import { createStackNavigator } from "@react-navigation/stack";
import Colors, { ColorSwitch } from "../../constants/Colors";
import { Text, View } from "../../components/Themed";

import HeaderRightDetail from "../../components/TabLayoutComp/HeaderRightDetail";
import HeaderRightHome from "../../components/TabLayoutComp/HeaderRightHome";
import CountryInfo from "../SubTabs/Home/CountryInfo";
import Index from "../(tabs)";

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  const CS = ColorSwitch(Colors.dark.tabIconSelected, "white");

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Discover Earth"
        component={Index}
        options={{
          headerStyle: {
            backgroundColor: CS,
          },
          headerTitle: "",
          headerRight: () => <HeaderRightHome headerType={"U"} />,
          headerLeft: () => (
            <View
              style={{ paddingHorizontal: 20, backgroundColor: "transparent" }}
            >
              <Text style={{ fontWeight: "700", fontSize: 18 }}>
                Discover Earth
              </Text>
              <Text style={{ fontSize: 10 }}>Where in the world?</Text>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CountryInfo"
        component={CountryInfo}
        options={({ route }: any) => ({
          headerStyle: {
            backgroundColor: CS,
          },
          title: "Details",
          headerRight: () => (
            <HeaderRightDetail id={route?.params?.id || null} />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}
