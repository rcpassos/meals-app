import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import { fetchCategories } from '../../store/actions/categories';
import styles from './styles';

function CategoriesScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const categories = useSelector(state => state.categories.categories);
  const error = useSelector(state => state.categories.error);
  const loading = useSelector(state => state.categories.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('error'), error.message);
    }
  }, [error, t]);

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
    <View style={styles.screen}>
      <FlatList data={categories} numColumns={2} renderItem={renderGridItem} />

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
    </View>
  );
}

export default CategoriesScreen;
