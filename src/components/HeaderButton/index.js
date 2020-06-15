import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HeaderButton({ onPress, iconName }) {
  return (
    <Icon
      style={{ paddingHorizontal: 15 }}
      name={iconName}
      size={26}
      color="#fff"
      onPress={onPress}
    />
  );
}
