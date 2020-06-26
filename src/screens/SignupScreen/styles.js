import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    marginTop: 20,
    color: '#000',
    paddingHorizontal: 16,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  primaryButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 20,
    backgroundColor: Colors.accentColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  activityIndicatorWrapper: {
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
