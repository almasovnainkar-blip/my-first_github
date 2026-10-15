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
  phone: string;
  onBack: () => void;
  onVerify: (code: string) => void;
};

export default function VerifyScreen({
  phone,
  onBack,
  onVerify,
}: Props) {
  const [code, setCode] = useState('');

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
        Подтверждение номера
      </Text>

      <Text style={styles.subtitle}>
        Введите код из 4 цифр
      </Text>

      <Text
        style={{
          color: '#AAA9B2',
          marginBottom: 20,
        }}
      >
        Код отправлен на: {phone}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔢</Text>

        <TextInput
          style={styles.input}
          placeholder="Код подтверждения"
          placeholderTextColor="#AAA9B2"
          keyboardType="number-pad"
          maxLength={4}
          value={code}
          onChangeText={(text) => {
            const numbers = text
              .replace(/[^0-9]/g, '')
              .slice(0, 4);

            setCode(numbers);
            console.log('Код:', numbers);
          }}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('Нажата кнопка: Подтвердить');

          if (code.length !== 4) {
            console.log('Ошибка: код должен содержать 4 цифры');
            return;
          }

          onVerify(code);
        }}
      >
        <Text style={styles.buttonText}>
          Подтвердить
        </Text>
      </Pressable>
    </View>
  );
}