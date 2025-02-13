import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const signIn = () => {
  const {refetch,isLoggedIn,loading} = useGlobalContext()

  if(!loading && isLoggedIn) return <Redirect href={'/'}/>

  const handleLogin = async() => {
    const result = await login()
    
    if(result) {
      refetch()
    }else{
      Alert.alert("Error", "Failed to Login")
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Image
          source={images.onboarding}
          style={{ width: "100%", height: "60%" }}
          resizeMode="contain"
        />
        <View style={{ paddingInline: 10 }}>
          <Text style={styles.welcomeText}>Welcome to ReState</Text>
          <Text style={styles.welcomePara}>Let’s Get You Closer</Text>
          <Text style={styles.welcomePara}>
            To <Text style={{ color: "#0061ff" }}>Your Ideal Home</Text>
          </Text>

          <Text style={styles.loginText}>Login to Real Scout with Google</Text>

          <TouchableOpacity style={styles.signinBtn} onPress={handleLogin}>
            <Image source={icons.google} style={styles.icon} />
            <Text style={styles.signinText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik-Regular",
    color: "#666876",
    marginBottom: 38,
  },
  welcomePara: {
    fontSize: 36,
    fontFamily: "Rubik-Bold",
    textAlign: "center",
    lineHeight: 40,
  },
  loginText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#666876",
    fontFamily: "Rubik-Regular",
  },
  signinBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "95%",
    marginTop: 40,
    marginInline: "auto",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#010101",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  signinText: {
    fontSize: 20,
    fontFamily: "Rubik-Medium",
    color: "#191D31",
  },
});
