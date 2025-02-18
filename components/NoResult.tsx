import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResult = () => {
  return (
    <View style={styles.container}>
      <Image source={images.noResult} style={styles.image} resizeMode='contain'/>
      <Text style={styles.text}>No Result</Text>
      <Text style={styles.para}>
        We could not find any results
      </Text>
    </View>
  )
}

export default NoResult

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:20
    },
    image:{
        width: 200,
        height: 200,
    },
    text:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333'
    },
    para:{
        marginTop:8,
        fontSize:12,
        fontWeight:500
    }
})