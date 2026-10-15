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
  onContinue: (phone: string) => void;
};

export default function ForgotPassword({
  onBack,
  onContinue,
}: Props) {
  const [phone, setPhone] = useState('');

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
        Восстановление пароля
      </Text>

      <Text style={styles.subtitle}>
        Введите номер телефона
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

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('Нажата кнопка: Продолжить');

          if (!phone) {
            console.log('Ошибка: телефон не введён');
            return;
          }

          onContinue(phone);
        }}
      >
        <Text style={styles.buttonText}>
          Продолжить
        </Text>
      </Pressable>
    </View>
  );
}