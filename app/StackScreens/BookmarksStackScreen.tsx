import { ColorSwitch, tintColorDark } from "../../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import HeaderRightHome from "../../components/TabLayoutComp/HeaderRightHome";
import BookMarks from "../(tabs)/Bookmarks";

const BookmarksStack = createStackNavigator();

export default function BookmarksStackScreen() {
  const ColorScheme = useColorScheme();
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen
        name="Bookmarks"
        component={BookMarks}
        options={{
          headerStyle: {
            backgroundColor: ColorSwitch(tintColorDark, "white"),
          },
          title: "Bookmarks",
          headerRight: () => <HeaderRightHome headerType={"B"} />,
        }}
      />
    </BookmarksStack.Navigator>
  );
}
