import { Cards, FeaturedCards } from "@/components/Cards";
import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const { user } = useGlobalContext();
  const parames = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties,
  });

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: parames.filter!,
      query: parames.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: parames.filter!,
      query: parames.query!,
      limit: 6,
    });
  }, [parames.filter, parames.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Image style={styles.headerAvater} source={{ uri: user?.avater }} />
                <View>
                  <Text style={styles.greeting}>Good Morning</Text>
                  <Text style={styles.username}>{user?.name}</Text>
                </View>
              </View>
              <View style={{ position: "relative" }}>
                <Image style={styles.headerIcon} source={icons.bell} />
                <View style={styles.notificationDot}></View>
              </View>
            </View>

            <Search />

            {/* Feature Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={latestProperties}
              renderItem={({ item }) => (
                <FeaturedCards item={item} onPress={() => handleCardPress(item?.$id)} />
              )}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                latestPropertiesLoading ? <ActivityIndicator size="large" style={{ marginTop: 5 }} /> : <NoResult />
              }
            />

            {/* Recommendation Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Recommendation</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <Filter />
          </>
        }
        data={properties}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 12 }}>
            <Cards item={item} />
          </View>
        )}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" style={{ marginTop: 5 }} /> : <NoResult />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvater: {
    width: 52,
    height: 52,
    marginRight: 10,
    borderRadius: 50,
    objectFit: "cover",
  },
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
  greeting: {
    color: "#8C8E98",
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
  username: {
    color: "#191D31",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    lineHeight: 24,
  },
  seeAll: {
    fontSize: 16,
    fontFamily: "Rubik-Bold",
    color: "#0061FF",
    lineHeight: 22.4,
  },
});

