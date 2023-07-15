import { TouchableNativeFeedback, Linking, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { ReactElement } from "react";

export default function OpenEmailButton({
  title,
  subTitle,
  icon1,
  icon2,
  mail,
}: {
  title: string;
  subTitle?: string;
  icon1: ReactElement;
  icon2?: ReactElement;
  mail: string;
}) {
  const handleOpenEmail = async () => {
    const recipient = mail;
    const subject = "[Your Subject]";
    const body =
      "Hello, I hope this email finds you well. I am reaching out to discuss [insert topic] and would appreciate your assistance. Thank you!";

    const emailUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(emailUrl);
    } catch (error) {
      console.error("Failed to open email:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={handleOpenEmail}>
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
