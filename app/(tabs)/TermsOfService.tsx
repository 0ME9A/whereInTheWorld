import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TermsOfService = () => {
  const handleOpenEmail = async () => {
    const recipient = "heyome9a@gmail.com";
    const subject = "Terms of Service";
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
      <Text style={styles.content}>
        Welcome to the Discover Earth app. These Terms of Service govern your
        use of the app. By accessing or using the app, you agree to be bound by
        these terms.
      </Text>
      <Text style={styles.sectionTitle}>1. App Usage:</Text>
      <Text style={styles.sectionContent}>
        - The Discover Earth app is provided for informational purposes only.
        The content within the app is subject to change without notice. - You
        are responsible for your use of the app and any consequences that may
        arise from it. - We reserve the right to modify, suspend, or discontinue
        the app at any time without prior notice.
      </Text>
      <Text style={styles.sectionTitle}>2. Intellectual Property:</Text>
      <Text style={styles.sectionContent}>
        - The Discover Earth app, including its design, graphics, and content,
        is protected by intellectual property rights and is owned by the app
        creator and other contributors. - You may not modify, distribute,
        reproduce, or sell any part of the app without prior written consent.
      </Text>
      <Text style={styles.sectionTitle}>3. User Conduct:</Text>
      <Text style={styles.sectionContent}>
        - You agree to use the app in compliance with applicable laws and
        regulations. - You shall not engage in any activity that may disrupt or
        interfere with the functioning of the app or its underlying systems.
      </Text>
      <Text style={styles.sectionTitle}>4. Disclaimer of Warranty:</Text>
      <Text style={styles.sectionContent}>
        - The app is provided on an "as is" basis without warranties of any
        kind, either expressed or implied. - We do not warrant that the app will
        be error-free, secure, or uninterrupted.
      </Text>
      <Text style={styles.sectionTitle}>5. Limitation of Liability:</Text>
      <Text style={styles.sectionContent}>
        - We shall not be liable for any direct, indirect, incidental,
        consequential, or punitive damages arising from your use of the app or
        any content within it.
      </Text>
      <Text style={styles.sectionTitle}>6. Governing Law:</Text>
      <Text style={styles.sectionContent}>
        - These Terms of Service shall be governed by and construed in
        accordance with the laws of [Your jurisdiction].
      </Text>
      <Text style={styles.sectionTitle}>7. Contact Information:</Text>
      <Text style={[styles.sectionContent, { fontStyle: "italic" }]}>
        If you have any questions or concerns about these Terms of Service, you
        can contact us at{" "}
        <TouchableOpacity onPress={handleOpenEmail}>
          <Text style={styles.link}>heyome9a@gmail.com</Text>
        </TouchableOpacity>
      </Text>
      <View style={{ padding: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  sectionContent: {
    marginBottom: 10,
  },
  contactInfo: {
    paddingVertical: 20,
    fontStyle: "italic",
  },
  link: {
    textDecorationLine: "underline",
    opacity: 0.8,
  },
});

export default TermsOfService;
