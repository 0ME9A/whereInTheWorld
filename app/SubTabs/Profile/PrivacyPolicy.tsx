import { StyleSheet, ScrollView, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "../../../components/Themed";
import { Link } from "expo-router";

export default function PrivacyPolicy() {
  const handleOpenEmail = async () => {
    const recipient = "heyome9a@gmail.com";
    const subject = "Privacy Policy";
    const body =
      "Hello, I hope this email finds you well. I am reaching out to discuss [insert topic] and would appreciate your assistance. Thank you!";

    const emailUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      await Linking.openURL(emailUrl);
    } catch (error) {
      console.error("Failed to open email:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Last updated: July 20, 2023</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information Collection and Use</Text>
        <Text style={styles.sectionText}>
          We do not collect or store any personal information or user data
          through the App. We do not track or monitor your activities within the
          App.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links to Third-Party Websites</Text>
          <Text style={styles.sectionText}>
            The App may contain links to third-party websites. We are not
            responsible for the privacy practices or the content of these
            third-party websites. We encourage you to review the privacy
            policies of those websites before providing any personal
            information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions or concerns about this Privacy Policy or
            the App, you may contact us via email at{" "}
            <TouchableOpacity onPress={handleOpenEmail}>
              <Text style={styles.link}>heyome9a@gmail.com</Text>
            </TouchableOpacity>
            . We welcome your feedback, suggestions, and reports of any bugs or
            issues you encounter while using the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open Source</Text>
          <Text style={styles.sectionText}>
            The Discover Earth App is an open-source project available on
            GitHub. You can contribute to the project or report any issues on
            the GitHub repository:
            <Link
              href={"https://github.com/0ME9A/discover_earth"}
              style={styles.link}
            >
              {" "}
              Discover Earth
            </Link>
          </Text>
        </View>

        <Text style={styles.footerText}>
          Changes to This Privacy Policy: We may update our Privacy Policy from
          time to time. Please review this page periodically for any changes.
          {"\n\n"}
          License: The Discover Earth App is licensed under the MIT License.
          Please refer to the license file in the GitHub repository for more
          information.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    padding: 20,
  },
  section: {
    // marginBottom: 24,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerText: {
    fontSize: 12,
    paddingVertical: 24,
  },
  link: {
    textDecorationLine: "underline",
    opacity: 0.8,
  },
});
