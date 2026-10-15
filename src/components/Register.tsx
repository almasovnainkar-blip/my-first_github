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
  onRegister: () => void;
};

export default function RegisterScreen({
  onBack,
  onRegister,
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
        Регистрация
      </Text>

      <Text style={styles.subtitle}>
        Создайте новый аккаунт
      </Text>

      <TextInput
        style={[
          styles.inputContainer,
          { paddingHorizontal: 18 },
        ]}
        placeholder="Имя"
        placeholderTextColor="#AAA9B2"
        value={name}
        onChangeText={(text) => {
          setName(text);
          console.log('Имя:', text);
        }}
      />

      <TextInput
        style={[
          styles.inputContainer,
          { paddingHorizontal: 18 },
        ]}
        placeholder="Номер телефона"
        placeholderTextColor="#AAA9B2"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          console.log('Телефон:', text);
        }}
      />

      <TextInput
        style={[
          styles.inputContainer,
          { paddingHorizontal: 18 },
        ]}
        placeholder="Пароль"
        placeholderTextColor="#AAA9B2"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          console.log('Пароль введён');
        }}
      />

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(
            'Нажата кнопка: Зарегистрироваться'
          );

          if (!name || !phone || !password) {
            console.log(
              'Ошибка: заполните все поля'
            );
            return;
          }

          onRegister();
        }}
      >
        <Text style={styles.buttonText}>
          Зарегистрироваться
        </Text>
      </Pressable>
    </View>
  );
}