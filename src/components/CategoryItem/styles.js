import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    textAlign: 'right',
  },
});
