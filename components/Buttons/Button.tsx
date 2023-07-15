import { TouchableNativeFeedback, Linking, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../Themed";
import { ReactElement } from "react";

export default function Button({
  title,
  subTitle,
  icon1,
  icon2,
  self,
  webLink,
}: {
  title: string;
  subTitle?: string;
  icon1: ReactElement;
  icon2?: ReactElement;
  self?: string;
  webLink?: string;
}) {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (webLink) Linking.openURL(webLink);
    if (self) navigation.navigate(self);
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={handlePress}>
        <View
          style={[
            styles.subContainer,
            {
              justifyContent: icon2 ? "space-between" : "flex-start",
            },
          ]}
        >
          <View style={styles.left}>
            {icon1}
            <View
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Text>{title}</Text>
              {subTitle && (
                <Text style={{ fontSize: 10, opacity: 0.8 }}>{subTitle}</Text>
              )}
            </View>
          </View>
          <View style={{ opacity: 0.8 }}>{icon2}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  subContainer: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  left: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
