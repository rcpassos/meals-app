import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CategoryItem from '../../components/CategoryItem';
import HeaderButton from '../../components/HeaderButton';
import { CATEGORIES } from '../../data/dummy-data';

function CategoriesScreen({ navigation }) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton onPress={() => navigation.openDrawer()} iconName="menu" />
      ),
    });
  }, [navigation]);

  function renderGridItem(itemData) {
    return <CategoryItem item={itemData.item} navigation={navigation} />;
  }

  return (
    <SafeAreaView>
      <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
    </SafeAreaView>
  );
}

export default CategoriesScreen;
