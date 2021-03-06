import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import '../config/StatusBarConfig';
import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import LoginScreen from '../screens/LoginScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import SignupScreen from '../screens/SignupScreen';
import { authenticate, logout } from '../store/actions/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerTintColor: '#fff',
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
};

function MealsNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: t('categories') }}
        />
        <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={{ title: t('meals') }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{ title: t('meal_detail') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FavoritesNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: t('favorites') }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{ title: t('meal_detail') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FiltersNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Filters"
          component={FiltersScreen}
          options={{ title: t('filters') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Meals') {
              iconName = 'restaurant';
            } else if (route.name === 'Favorites') {
              iconName = 'favorite';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel: ({ color, size }) => {
            let tabLabel;

            if (route.name === 'Meals') {
              tabLabel = t('meals');
            } else if (route.name === 'Favorites') {
              tabLabel = t('favorites');
            }

            return (
              <Text size={size} style={{ color, fontSize: size }}>
                {tabLabel}
              </Text>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: {
            fontFamily: 'OpenSans-Regular',
          },
        }}>
        <Tab.Screen name="Meals" component={MealsNavigator} />
        <Tab.Screen name="Favorites" component={FavoritesNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function AuthNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: t('login') }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: t('signup') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => dispatch(logout())} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="TabNavigator"
        drawerContentOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: { fontFamily: 'OpenSans-Regular', fontWeight: 'normal' },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ drawerLabel: t('meals') }}
        />
        <Drawer.Screen
          name="Filters"
          component={FiltersNavigator}
          options={{ drawerLabel: t('filters') }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const userToken = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    async function bootstrapAsync() {
      try {
        const userData = await AsyncStorage.getItem('userData');

        if (!userData) {
          setIsLoading(false);
          return;
        }

        const objUserData = JSON.parse(userData);
        const {
          token,
          userId,
          expirationDate: expirationDateString,
        } = objUserData;

        const expirationDate = new Date(expirationDateString);

        if (expirationDate <= new Date() || !token || !userId) {
          setIsLoading(false);
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();

        setIsLoading(false);
        dispatch(authenticate(token, userId, expirationTime));
      } catch (error) {
        setIsLoading(false);
      }
    }

    bootstrapAsync();
  }, [dispatch]);

  if (isLoading) {
    return <View />;
  }

  if (userToken === null) {
    return <AuthNavigator />;
  } else {
    return <DrawerNavigator />;
  }
}
