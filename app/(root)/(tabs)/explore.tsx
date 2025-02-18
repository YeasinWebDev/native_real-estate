import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { Cards, ExploreCards } from "@/components/Cards";
import NoResult from "@/components/NoResult";

const explore = () => {
  const parames = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: parames.filter!,
      query: parames.query!
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: parames.filter!,
      query: parames.query!,
    });
  }, [parames.filter, parames.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: 20,
              }}
            >
              <Pressable
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#0061FF1A",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </Pressable>
              <Text style={{ fontSize: 16, fontFamily: "Rubik-Medium" }}>
                Search for Your Ideal Home
              </Text>
              <View style={{ position: "relative" }}>
                <Image style={styles.headerIcon} source={icons.bell} />
                <View style={styles.notificationDot}></View>
              </View>
            </View>
            <Search />
            <Filter />
          </>
        }
        data={properties}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 12 }}>
            <ExploreCards item={item} handleCardPress={handleCardPress}/>
          </View>
        )}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" style={{ marginTop: 5 }} /> : <NoResult />
        }
      />
    </SafeAreaView>
  );
};

export default explore;

const styles = StyleSheet.create({
  headerIcon: {
    width: 26,
    height: 26,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#0061FF",
    position: "absolute",
    top: 0,
    right: 3,
    zIndex: 10,
  },
});
