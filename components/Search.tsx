import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from 'use-debounce'

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  const [search, setSearch] = useState(params.query);

  const  debouncedSearch = useDebouncedCallback((text:string) => router.setParams({query:text}),500)

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Image style={styles.searchIcon} source={icons.search} />
        <TextInput
          placeholder="Search something..."
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity>
        <Image style={{ width: 20, height: 20 ,marginLeft:-20}} source={icons.filter} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 12,
    backgroundColor: "#FBFBFD",
    height: 52,
    marginTop: 20,
    marginInline: 20,
    borderColor: "#0061FF0A",
    borderWidth: 1,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
