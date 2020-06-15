import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HeaderButton({ onPress, iconName }) {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 15 }}>
      <Icon name={iconName} size={26} color="#fff" onPress={onPress} />
    </TouchableOpacity>
  );
}
