import React, { useCallback, useLayoutEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/HeaderButton';
import { toggleFavorite } from '../../store/actions/meals';
import styles from './styles';

function ListItem(props) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.defaultText}>{props.children}</Text>
    </View>
  );
}

function MealDetailScreen({ route, navigation }) {
  const {
    id,
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
  } = route.params;

  const dispatch = useDispatch();

  const isFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === id),
  );

  const favoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(id));
  }, [dispatch, id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <HeaderButton
          onPress={favoriteHandler}
          iconName={isFavorite ? 'favorite' : 'favorite-border'}
        />
      ),
    });
  }, [title, navigation, favoriteHandler, isFavorite]);

  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.details}>
        <Text style={styles.defaultText}>{duration}m</Text>
        <Text style={styles.defaultText}>{complexity.toUpperCase()}</Text>
        <Text style={styles.defaultText}>{affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
}

export default MealDetailScreen;
