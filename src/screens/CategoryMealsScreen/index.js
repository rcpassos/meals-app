import React, { useLayoutEffect } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MealItem from '../../components/MealItem';
import styles from './styles';

function CategoryMealsScreen({ route, navigation }) {
  const { id, title } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [title, navigation]);

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const meals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(id) >= 0,
  );

  if (meals.length === 0 || !meals) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.defaultText}>
          No meals found, maybe check your filters
        </Text>
      </SafeAreaView>
    );
  }

  function renderListItem(itemData) {
    return <MealItem item={itemData.item} navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList data={meals} renderItem={renderListItem} />
    </SafeAreaView>
  );
}

export default CategoryMealsScreen;
