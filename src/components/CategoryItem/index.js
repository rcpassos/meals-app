import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import styles from './styles';

function CategoryItem({ item, navigation }) {
  function showDetail() {
    navigation.navigate('CategoryMeals', item);
  }

  return (
    <View style={styles.item}>
      <TouchableNativeFeedback onPress={showDetail}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: item.color } }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default CategoryItem;
