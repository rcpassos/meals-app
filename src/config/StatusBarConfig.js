import { Platform, StatusBar } from 'react-native';
import Colors from '../constants/Colors';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor(Colors.primaryColor);
}

StatusBar.setBarStyle('light-content');
