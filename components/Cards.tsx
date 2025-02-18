import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
  item:any
}

export const FeaturedCards = ({ onPress,item }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredCards}>
      <Image
        source={{uri:item?.image}}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: 20,
        }}
      />
      <Image
        source={images.cardGradient}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: 20,
          position: "absolute",
          bottom: 0,
          zIndex: 1,
        }}
      />

      <View style={styles.starContainer}>
        <Image
          source={icons.star}
          style={{ width: 15, height: 15, objectFit: "cover" }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "#246BFD",
            fontFamily: "Rubik-Bold",
            marginTop: 2,
          }}
        >
          {item?.rating}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          zIndex: 2,
          marginInline: 14,
        }}
      >
        <Text
          style={{
            fontFamily: "Rubik-Bold",
            fontSize: 20,
            color: "#fff",
          }}
        >
          {item?.name}
        </Text>
       <Text
          style={{ fontFamily: "Rubik-Regular", fontSize: 16, color: "#fff" }}
        >
          {item?.address}
        </Text> 
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "Rubik-Bold", fontSize: 20, color: "#fff" }}
          >
            ${item?.price}
          </Text>
          <Image
            style={{ width: 22, height: 22, objectFit: "cover" }}
            source={icons.heart}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Cards = ({item}:any) => {
  return (
    <TouchableOpacity
      style={{
        width: 187,
        height: 270,
        paddingHorizontal: 14,
        paddingVertical: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
      }}
    >
      <Image
        source={{uri:item?.image}}
        style={{
          objectFit: "cover",
          width: 159,
          height: 154,
          borderRadius: 10,
        }}
      />
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: "Rubik-SemiBold",
            fontSize: 16,
            color: "#000",
          }}
        >
          {item?.name}
        </Text>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 12,
            color: "#8C8E98",
          }}
        >
          {item?.address}
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "Rubik-SemiBold",
              fontSize: 16,
              color: "#0061FF",
            }}
          >
            ${item?.price}
          </Text>
        </View>
      </View>
      <View style={[styles.starContainer, {top:30,right:20}]}>
        <Image
          source={icons.star}
          style={{ width: 15, height: 15, objectFit: "cover" }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "#246BFD",
            fontFamily: "Rubik-Bold",
            marginTop: 2,
          }}
        >
          4.8
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featuredCards: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: 250,
    height: 340,
    position: "relative",
    overflow: "hidden",
    marginLeft:20
  },
  starContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    top: 10,
    right: 10,
    borderRadius: 20,
  },
});
