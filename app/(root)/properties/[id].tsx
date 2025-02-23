import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });
  const galleryImages = property?.gallery.map((item: any) => item.image);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ position: "relative" }}>
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              zIndex: 10,
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable onPress={() => router.back()}>
              <Image
                style={{ width: 28, height: 28 }}
                source={icons.backArrow}
              />
            </Pressable>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Image
                source={icons.heartLight}
                style={{ width: 23, height: 22 }}
              />
              <Image source={icons.send} style={{ width: 23, height: 22 }} />
            </View>
          </View>
          <Image
            source={{ uri: property?.image }}
            style={{ width: "100%", height: 400, objectFit: "cover" }}
          />
        </View>

        {/* property details */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 30, fontFamily: "Rubik-SemiBold" }}>
            {property?.name}
          </Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text
              style={{
                backgroundColor: "#0061FF0A",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                color: "#0061FF",
                fontFamily: "Rubik-Medium",
                flexWrap: "nowrap",
              }}
            >
              {property?.type}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Image source={icons.star} />
              <Text style={{ fontFamily: "Rubik-Medium", fontSize: 14 }}>
                {property?.rating}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              borderBottomColor: "#0061FF1A",
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0061FF0A",
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                  source={icons.bed}
                />
              </View>
              <Text
                style={{
                  color: "#191D31",
                  fontFamily: "Rubik-Medium",
                  fontSize: 14,
                }}
              >
                {property?.bedrooms} Beds
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0061FF0A",
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                  source={icons.bath}
                />
              </View>
              <Text
                style={{
                  color: "#191D31",
                  fontFamily: "Rubik-Medium",
                  fontSize: 14,
                }}
              >
                {property?.bathrooms} Bath
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0061FF0A",
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                  source={icons.area}
                />
              </View>
              <Text
                style={{
                  color: "#191D31",
                  fontFamily: "Rubik-Medium",
                  fontSize: 14,
                }}
              >
                {property?.area} sqft
              </Text>
            </View>
          </View>

          {/* agent */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-SemiBold",
              marginTop: 20,
            }}
          >
            Agent
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Image
                source={{ uri: property?.agent?.avatar }}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
              <View>
                <Text style={{ fontSize: 18, fontFamily: "Rubik-Medium" }}>
                  {property?.agent?.name}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
                  {property?.agent?.email}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Image style={{ width: 28, height: 28 }} source={icons.chat} />
              <Image style={{ width: 28, height: 28 }} source={icons.phone} />
            </View>
          </View>

          {/* overview */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-SemiBold",
              marginTop: 28,
            }}
          >
            Overview
          </Text>
          <Text
            style={{
              color: "#666876",
              fontSize: 16,
              fontFamily: "Rubik-light",
              marginTop: 1,
            }}
          >
            Sleek, modern 2-bedroom apartment with open living space, high-end
            finishes, and city views. Minutes from downtown, dining, and
            transit.
          </Text>

          {/* facilities  */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-SemiBold",
              marginTop: 28,
            }}
          >
            Facilities
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 30,
              marginVertical: 10,
            }}
          >
            {property?.facilities?.map((facility: string, index: number) => (
              <View key={index} style={{ alignItems: "center" }}>
                <ShowImage name={facility} />
                <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
                  {facility}
                </Text>
              </View>
            ))}
          </View>

          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-SemiBold",
              marginTop: 28,
            }}
          >
            Gallery
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {property?.gallery.length > 0 ? (
              galleryImages.map((image: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{
                    width: 120,
                    height: 118,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              ))
            ) : (
              <Text>No Image Found</Text>
            )}
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image source={icons.star} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-SemiBold",
                }}
              >
                {property?.rating} ({Math.round(Math.random() * 1000)} reviews)
              </Text>
            </View>
            <Text
              style={{
                color: "#0061FF",
                fontSize: 16,
                fontFamily: "Rubik-Medium",
              }}
            >
              See All
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={images.avatar}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Rubik-Medium",
              }}
            >
              Charolette Hanlin
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rubik-Regular",
              marginTop: 10,
              color: "#666876",
            }}
          >
            The apartment is very clean and modern. I really like the interior
            design. Looks like I'll feel at home 😍
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5, marginTop: 16 }}>
              <Image source={icons.heartBlue} />
              <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
                {Math.round(Math.random() * 1000)}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
                color: "#8C8E98",
              }}
            >
              {Math.round(Math.random() * 10)} days ago
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 110,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            paddingTop: 10,
            paddingInline: 20,
            borderRadius: 12,
          }}
        >
          <View>
            <Text
              style={{
                color: "#666876",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              PRICE
            </Text>
            <Text
              style={{
                color: "#0061FF",
                fontSize: 24,
                fontFamily: "Rubik-Medium",
              }}
            >
              ${property?.price}
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#0061FF",
              width: 236,
              height: 50,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Rubik-Medium",
                color: "#ffffff",
              }}
            >
              Booking Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
const ShowImage = ({ name }: { name: string }) => {
  if (name === "Gym") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.dumbell}
        />
      </View>
    );
  } else if (name === "Wifi") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.wifi}
        />
      </View>
    );
  } else if (name === "Cutlery") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.cutlery}
        />
      </View>
    );
  } else if (name === "Pet-friendly") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.dog}
        />
      </View>
    );
  } else if (name === "Sports Center") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.run}
        />
      </View>
    );
  } else if (name == "Swimming pool") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.swim}
        />
      </View>
    );
  } else if (name === "Laundry") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.laundry}
        />
      </View>
    );
  } else if (name === "Car Parking") {
    return (
      <View
        style={{
          backgroundColor: "#0061FF0A",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
          source={icons.carPark}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({});
