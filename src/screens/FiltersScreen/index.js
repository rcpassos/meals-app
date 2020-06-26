import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FilterSwitch from '../../components/FilterSwitch';
import HeaderButton from '../../components/HeaderButton';
import { setFilters } from '../../store/actions/meals';
import styles from './styles';

function FiltersScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const appliedFilters = useSelector(state => state.meals.appliedFilters);

  const [isGlutenFree, setIsGlutenFree] = useState(
    appliedFilters?.glutenFree || false,
  );
  const [isLactoseFree, setIsLactoseFree] = useState(
    appliedFilters?.lactoseFree || false,
  );
  const [isVegan, setIsVegan] = useState(appliedFilters?.vegan || false);
  const [isVegetarian, setIsVegetarian] = useState(
    appliedFilters?.vegetarian || false,
  );

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    if (appliedFilters) {
      setIsGlutenFree(appliedFilters.glutenFree);
      setIsLactoseFree(appliedFilters.lactoseFree);
      setIsVegan(appliedFilters.vegan);
      setIsVegetarian(appliedFilters.vegetarian);
    }
  }, [appliedFilters]);

  useEffect(() => {
    saveFilters();
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, saveFilters]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton onPress={() => navigation.openDrawer()} iconName="menu" />
      ),
    });
  }, [saveFilters, navigation]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t('filters_subtitle')}</Text>
      <FilterSwitch
        label={t('gluten_free')}
        value={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label={t('lactose_free')}
        value={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label={t('vegan')}
        value={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label={t('vegetarian')}
        value={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
}

export default FiltersScreen;
