import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingItemProps {
  icon: any;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  showArrow = true,
}: SettingItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={{display:"flex" , flexDirection:'row'}}>
        <Image source={icon} style={styles.itemIcon} />
        <Text style={[styles.itemTitle, title === 'Logout' && {color:'#F75555'} ]}>{title}</Text>
      </View>
      {showArrow && (
        <Image source={icons.rightArrow} style={{ width: 22, height: 22 }} />
      )}
    </TouchableOpacity>
  );
};

const profile = () => {
  const {user,refetch} = useGlobalContext()

  const handleLogOut = async () => {
    console.log('logout')
    const  result = await logout()
    if (result) {
      Alert.alert("Logged Out Successfully");
      refetch()
    }
     else {
      Alert.alert("An error has occurred while logging out")
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 124, paddingInline: 28 }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.herderText}>Profile</Text>
          <Image source={icons.bell} style={styles.headerIcon} />
        </View>

        <View style={styles.userInfoContainer}>
          <Image source={{uri:user?.avater}} style={styles.profileImage} />
          <TouchableOpacity>
            <Image source={icons.edit} style={styles.editBtn} />
          </TouchableOpacity>
          <Text style={styles.userInfoText}>{user?.name}</Text>
        </View>

        <View style={{marginTop:10}}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payment" />
        </View>

        <View style={styles.itemSecendList}>
          {settings.slice(2).map((item,index) => (
            <SettingsItem key={index} {...item}/>
          ))}
        </View>
        <View>
           <SettingsItem onPress={handleLogOut} icon={icons.logout} title="Logout" showArrow={false}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  herderText: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
    position: "relative",
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderBlockColor: "#0061FF1A",
  },
  editBtn: {
    position: "absolute",
    top: -35,
    left: 40,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    resizeMode: "cover",
  },
  userInfoText: {
    fontSize: 24,
    fontFamily: "Rubik-Medium",
    marginTop: 4,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    justifyContent:'space-between'
  },
  itemIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginLeft: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#000000",
    marginLeft: 10,
  },
  itemSecendList:{
    display: "flex",
    borderBlockColor: "#0061FF1A",
    borderTopWidth: 1,
    paddingTop: 24,
    marginTop:10
  }
})