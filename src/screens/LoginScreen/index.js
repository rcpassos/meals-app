import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { clearError, login } from '../../store/actions/auth';
import styles from './styles';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      Alert.alert(t('error'), error);
    }
  }, [error, t, dispatch]);

  async function loginHandler() {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(t('error'), t('fill_form'));
      return;
    }

    dispatch(login(email, password));
  }

  function createAccountHandler() {
    navigation.navigate('Signup');
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <View>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize="none"
          placeholder={t('email')}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          autoCapitalize="none"
          placeholder={t('password')}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        {loading ? (
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator color={Colors.accentColor} size="small" />
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={loginHandler}>
              <Text style={styles.primaryButtonText}>{t('login')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secundaryButton}
              onPress={createAccountHandler}>
              <Text style={styles.secondaryButtonText}>
                {t('create_account')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
