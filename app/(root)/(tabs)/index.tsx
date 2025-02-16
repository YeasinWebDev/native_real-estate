import { Cards, FeaturedCards } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = Array(4).fill(null);

export default function Index() {
  const { user } = useGlobalContext();
  const [selected, setSelected] = useState("All");

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
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FeaturedCards />
            <FeaturedCards />
          </ScrollView>
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
        <View style={{ marginVertical: 14, marginInline: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  selected === category ? styles.selectedTab : null,
                ]}
                onPress={() => setSelected(category)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selected === category ? styles.selectedTabText : null,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => (
              <View style={{ margin: 12 }}>
                <Cards />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const categories = ["All", "House", "Villa", "Apartments", "Other"];

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
    borderRadius:50,
    objectFit:'cover'
  },
  headerIcon: {
    width: 26,
    height: 26,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    backgroundColor: "#f8f9fc",
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: "#0066ff",
    borderColor: "#0066ff",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  selectedTabText: {
    color: "#fff",
  },
});
