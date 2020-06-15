import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import styles from './styles';

function MealItem({ item, navigation }) {
  function showDetail() {
    navigation.navigate('MealDetail', item);
  }

  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={showDetail}>
          <View>
            <View style={{ ...styles.row, ...styles.header }}>
              <ImageBackground
                source={{ uri: item.imageUrl }}
                style={styles.image}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ ...styles.row, ...styles.detail }}>
              <Text style={styles.defaultText}>{item.duration}m</Text>
              <Text style={styles.defaultText}>
                {item.complexity.toUpperCase()}
              </Text>
              <Text style={styles.defaultText}>
                {item.affordability.toUpperCase()}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

export default MealItem;
