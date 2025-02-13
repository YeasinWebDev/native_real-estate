import { useGlobalContext } from "@/lib/global-provider";
import { Slot, useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function APPLayout() {
  const { loading, isLoggedIn } = useGlobalContext();
  const router = useRouter();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="blue" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    router.push("/signIn");
    return null;
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
