import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const PhotoItem = ({ id, uri, height, width }) => {
  return (
    <View style={{...styles.container, height: height, maxWidth: width }}>
      <Image style={styles.img} source={{ uri }} />
      <Text style={styles.label}>{ id }</Text>
    </View>
  )
}

export default PhotoItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  img: {
    flex: 1,
    borderRadius: 10
  },
  label: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Nunito_bold',
    bottom: 15,
    right: 15,
    fontSize: 18
  }
})
