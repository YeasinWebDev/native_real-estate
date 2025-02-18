import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const Filter = () => {
    const params= useLocalSearchParams<{filter?:string}>()
  const [selected, setSelected] = useState(params.filter || "All");

  const handleCategoryPress = (category:string) =>{
    if(selected === category){
        setSelected('')
        router.setParams({filter:''})
        return
    }
    setSelected(category)
    router.setParams({filter: category})
  }
  return (
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
            onPress={() => handleCategoryPress(category)}
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
  );
};

export default Filter;

const categories = ["All", "House", "Villa", "Apartment", "Other"];

const styles = StyleSheet.create({
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
