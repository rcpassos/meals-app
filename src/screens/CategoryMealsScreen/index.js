import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MealItem from '../../components/MealItem';
import Colors from '../../constants/Colors';
import { fetchMeals } from '../../store/actions/meals';
import styles from './styles';

function CategoryMealsScreen({ route, navigation }) {
  const { id, title } = route.params;

  const { t, i18n } = useTranslation();

  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const error = useSelector(state => state.meals.error);
  const loading = useSelector(state => state.meals.loading);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [title, navigation]);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('error'), error.message);
    }
  }, [error, t]);

  const meals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(id) >= 0,
  );

  if ((meals.length === 0 || !meals) && !loading) {
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

      {loading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            hidesWhenStopped={true}
            animating={loading}
            color={Colors.accentColor}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default CategoryMealsScreen;
