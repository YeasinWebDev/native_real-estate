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
  const parames = useLocalSearchParams<{ query?: string; filter?: string }>()

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
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
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.headerAvater} source={{ uri: user?.avater }} />
            <View>
              <Text
                style={{
                  color: "#8C8E98",
                  fontFamily: "Rubik-Regular",
                  fontSize: 12,
                }}
              >
                Good Morning
              </Text>

              <Text
                style={{
                  color: "#191D31",
                  fontSize: 16,
                  fontFamily: "Rubik-Medium",
                }}
              >
                {user?.name}
              </Text>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <Image style={styles.headerIcon} source={icons.bell} />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: "#0061FF",
                position: "absolute",
                top: 0,
                right: 3,
                zIndex: 10,
              }}
            ></View>
          </View>
        </View>

        <Search />

        {/* Feature Section */}
        <View style={{ marginBlock: 20, marginInline: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Rubik-SemiBold",
                lineHeight: 24,
              }}
            >
              Featured
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Bold",
                  color: "#0061FF",
                  lineHeight: 22.4,
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={latestProperties}
            renderItem={({ item }) => (
              <FeaturedCards
                item={item}
                onPress={() => handleCardPress(item?.$id)}
              />
            )}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              latestPropertiesLoading ? (
                <ActivityIndicator
                  size="large"
                  style={{
                    marginTop: 5,
                  }}
                />
              ) : (
                <NoResult />
              )
            }
          />
        </View>

        {/* Recommendation */}
        <View style={{ marginInline: 20, marginTop: 25 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Rubik-SemiBold",
                lineHeight: 24,
              }}
            >
              Our Recommendation
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Bold",
                  color: "#0061FF",
                  lineHeight: 22.4,
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Filter/>

        <View style={{ marginHorizontal: 20 }}>
          <FlatList
            data={properties}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 12 }}>
                <Cards item={item} />
              </View>
            )}
            ListEmptyComponent={
              loading ? (
                <ActivityIndicator
                  size="large"
                  style={{
                    marginTop: 5,
                  }}
                />
              ) : (
                <NoResult />
              )
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 25,
    marginTop: 10,
  },
  headerLeft: {
    display: "flex",
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
  
});
