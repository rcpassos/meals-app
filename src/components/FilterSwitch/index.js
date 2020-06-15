import React from 'react';
import { Switch, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';

function FilterSwitch({ label, value, onChange }) {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{ true: Colors.accentColor }}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}

export default FilterSwitch;
