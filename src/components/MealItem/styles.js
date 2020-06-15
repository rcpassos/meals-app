import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    height: '85%',
  },
  detail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  defaultText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
});
