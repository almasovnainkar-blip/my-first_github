import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './ui';

type Props = {
  onForgot: () => void;
  onRegister: () => void;
  onLogin: (phone: string, password: string) => void;
};

export default function LoginScreen({
  onForgot,
  onRegister,
  onLogin,
}: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>
        Добро пожаловать
      </Text>

      <Text style={styles.subtitle}>
        Войдите в свой аккаунт
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>☎</Text>

        <TextInput
          style={styles.input}
          placeholder="Номер телефона"
          placeholderTextColor="#AAA9B2"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            console.log('Телефон:', text);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor="#AAA9B2"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            console.log('Пароль введён');
          }}
        />

        <Pressable
          style={styles.eyeButton}
          onPress={() => {
            console.log('Нажата кнопка: показать/скрыть пароль');
            setShowPassword(!showPassword);
          }}
        >
          <Text style={styles.eyeText}>
            {showPassword ? '🙈' : '👁'}
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={onForgot}>
        <Text
          style={{
            color: '#6C3BFF',
            alignSelf: 'flex-end',
            marginBottom: 20,
            fontWeight: '600',
          }}
        >
          Забыли пароль?
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          onLogin(phone, password);
        }}
      >
        <Text style={styles.buttonText}>
          Войти
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#6C3BFF',
          },
        ]}
        onPress={onRegister}
      >
        <Text
          style={[
            styles.buttonText,
            { color: '#6C3BFF' },
          ]}
        >
          Зарегистрироваться
        </Text>
      </Pressable>
    </View>
  );
}