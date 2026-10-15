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
  onBack: () => void;
  onReset: (password: string) => void;
};

export default function ResetPasswordScreen({
  onBack,
  onReset,
}: Props) {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showRepeatPassword, setShowRepeatPassword] =
    useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Pressable
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>←</Text>
      </Pressable>

      <Text style={styles.title}>
        Сбросить пароль
      </Text>

      <Text style={styles.subtitle}>
        Создайте новый пароль
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>

        <TextInput
          style={styles.input}
          placeholder="Новый пароль"
          placeholderTextColor="#AAA9B2"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            console.log('Вводится новый пароль');
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

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>

        <TextInput
          style={styles.input}
          placeholder="Повторите пароль"
          placeholderTextColor="#AAA9B2"
          secureTextEntry={!showRepeatPassword}
          value={repeatPassword}
          onChangeText={(text) => {
            setRepeatPassword(text);
            console.log('Вводится повторный пароль');
          }}
        />

        <Pressable
          style={styles.eyeButton}
          onPress={() => {
            console.log('Нажата кнопка: показать/скрыть повторный пароль');
            setShowRepeatPassword(!showRepeatPassword);
          }}
        >
          <Text style={styles.eyeText}>
            {showRepeatPassword ? '🙈' : '👁'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(
            'Нажата кнопка: Сбросить пароль'
          );

          if (!password || !repeatPassword) {
            console.log('Ошибка: заполните оба поля');
            return;
          }

          if (password !== repeatPassword) {
            console.log('Ошибка: пароли не совпадают');
            return;
          }

          onReset(password);
        }}
      >
        <Text style={styles.buttonText}>
          Сбросить пароль
        </Text>
      </Pressable>
    </View>
  );
}