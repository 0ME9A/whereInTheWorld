import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";

export default function NoRecord({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{ textAlign: "center" }}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "500",
  },
});
