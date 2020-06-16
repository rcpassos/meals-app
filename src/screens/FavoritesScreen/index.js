import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/HeaderButton';
import MealItem from '../../components/MealItem';
import styles from './styles';

function FavoritesScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton onPress={() => navigation.openDrawer()} iconName="menu" />
      ),
    });
  }, [navigation]);

  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.defaultText}>{t('no_meals_found')}</Text>
      </SafeAreaView>
    );
  }

  function renderListItem(itemData) {
    return <MealItem item={itemData.item} navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList data={favoriteMeals} renderItem={renderListItem} />
    </SafeAreaView>
  );
}

export default FavoritesScreen;
