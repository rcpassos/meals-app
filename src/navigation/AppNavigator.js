import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import '../config/StatusBarConfig';
import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

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
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: 'Categories' }}
        />
        <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={{ title: 'Meals' }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{ title: 'Meal Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FavoritesNavigator() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{ title: 'Meal Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FiltersNavigator() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Filters"
          component={FiltersScreen}
          options={{ title: 'Filters' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="TabNavigator"
        drawerContentOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: { fontFamily: 'OpenSans-Regular' },
        }}>
        <Drawer.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ drawerLabel: 'Meals' }}
        />
        <Drawer.Screen name="Filters" component={FiltersNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
