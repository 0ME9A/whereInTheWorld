import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors, {
  tintColorLightDark,
  ColorSwitch,
  BlackWhite,
} from "../../constants/Colors";
import {
  MaterialIcons,
  FontAwesome,
  EvilIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

import OpenEmailButton from "../../components/Buttons/OpenEmailButton";
import Button from "../../components/Buttons/Button";

export default function Profile() {
  const CS = ColorSwitch(Colors.dark.background, Colors.light.background);
  const BW = BlackWhite(true);

  const externalLinkIcon = (
    <EvilIcons name="external-link" size={24} color={BW} />
  );

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: CS,
        },
      ]}
    >
      <LinearGradient colors={[tintColorLightDark, CS]}>
        <View
          style={[styles.profileContainer, { backgroundColor: "transparent" }]}
        >
          <View
            style={{
              borderWidth: 3,
              width: 50,
              aspectRatio: 1,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              paddingTop: 5,
              backgroundColor: "orangered",
              borderColor: "maroon",
            }}
          >
            <FontAwesome name="user" size={48} color={BW} />
          </View>

          <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "500" }}>
            Hi there!
          </Text>
        </View>
      </LinearGradient>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={{ fontWeight: "500", padding: 10, paddingBottom: 5 }}>
        About
      </Text>
      <Button
        title={"GitHub"}
        subTitle="Star us on GitHub"
        icon1={<FontAwesome name="github" size={24} color={BW} />}
        icon2={externalLinkIcon}
        webLink="https://github.com/0ME9A/discover_earth"
      />
      <Button
        title={"Send Feedback"}
        subTitle="Report a bug or request for new features"
        icon1={<MaterialIcons name="feedback" size={24} color={BW} />}
        icon2={externalLinkIcon}
        webLink="https://github.com/0ME9A/discover_earth/issues"
      />
      <Button
        title={"Version"}
        subTitle="00.00.01"
        icon1={<Octicons name="versions" size={24} color={BW} />}
      />
      <Text style={{ fontWeight: "500", padding: 10, paddingBottom: 5 }}>
        Contact Us
      </Text>
      <OpenEmailButton
        title={"Contact us"}
        subTitle="heyome9a@gmail.com"
        icon1={<Ionicons name="mail" size={24} color={BW} />}
        icon2={externalLinkIcon}
        mail="https://heyome9a@gmail.com"
      />

      <Text style={{ fontWeight: "500", padding: 10, paddingBottom: 5 }}>
        Security
      </Text>
      <Button
        title={"Privacy Policy"}
        subTitle="Important for both of us"
        icon1={<MaterialIcons name="security" size={24} color={BW} />}
        self="PrivacyPolicy"
      />
      <Button
        title={"Term of service"}
        subTitle="All the stuff you need to know"
        icon1={
          <MaterialIcons name="miscellaneous-services" size={24} color={BW} />
        }
        self="TermsOfService"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingVertical: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
});
