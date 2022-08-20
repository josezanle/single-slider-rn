import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image
} from 'react-native'

const { width } = Dimensions.get('window');

export const App = () => {

  const initialState = [
    { _id: 1, imageUrl: 'https://images.pexels.com/photos/783262/pexels-photo-783262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { _id: 2, imageUrl: 'https://images.pexels.com/photos/4700589/pexels-photo-4700589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { _id: 3, imageUrl: 'https://images.pexels.com/photos/1706020/pexels-photo-1706020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },

  ]

  const [sliderIndex, setSliderIndex] = useState(0);
  const [maxSlider] = useState(2);
  const [banners] = useState(initialState);

  const flatListRef = useRef();

  const scrollToIndex = (index, animated) => {
    flatListRef?.current?.scrollToIndex({ index, animated })
  }

  useEffect(() => {
    const timer = setInterval(function () {
      if (sliderIndex < maxSlider) {
        setSliderIndex(sliderIndex + 1)
      }
      if (sliderIndex === banners.length - 1) {
        setSliderIndex(0)
      }
      scrollToIndex(sliderIndex, true)
    }, 3000)

    return () => clearInterval(timer);

  }, [sliderIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item._id}
        renderItem={({ item, i }) => {
          return (
            <View key={i} style={styles.container}>
              <Image style={styles.container} source={{ uri: item.imageUrl }} />
            </View>
          )

        }}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
  },
  // ---------------------------
  // ---------------------------
  sliderContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    justifyContent: "center",
    alignSelf: 'center',
    alignItems: 'center',
  },
  sliderBtn: {
    height: 13,
    width: 13,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sliderBtnSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },


});
