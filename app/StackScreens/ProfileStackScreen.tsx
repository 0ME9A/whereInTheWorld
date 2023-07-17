import { createStackNavigator } from "@react-navigation/stack";

import TermsOfService from "../SubTabs/Profile/TermsOfService";
import PrivacyPolicy from "../SubTabs/Profile/PrivacyPolicy";
import Profile from "../(tabs)/Profile";

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
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
