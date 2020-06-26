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
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { clearError, signup } from '../../store/actions/auth';
import styles from './styles';

function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      Alert.alert(t('error'), error);
    }
  }, [error, t, dispatch]);

  async function signupHandler() {
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === '' ||
      password !== confirmPassword
    ) {
      Alert.alert(t('error'), t('fill_form'));
      return;
    }

    dispatch(signup(email, password));
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
        <TextInput
          style={styles.input}
          value={confirmPassword}
          autoCapitalize="none"
          placeholder={t('confirm_password')}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        {loading ? (
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator color={Colors.accentColor} size="small" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={signupHandler}>
            <Text style={styles.primaryButtonText}>{t('signup')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;
