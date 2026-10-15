import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './ui';

type Props = {
  onBack: () => void;
  onFinish: (city: string) => void;
};

export default function SelectCityScreen({
  onBack,
  onFinish,
}: Props) {
  const [city, setCity] = useState('');

  const cities = [
    'Алматы',
    'Астана',
    'Шымкент',
    'Караганда',
    'Актобе',
    'Тараз',
    'Павлодар',
    'Усть-Каменогорск',
  ];

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
        Выберите город
      </Text>

      <Text style={styles.subtitle}>
        Выберите ваш город
      </Text>

      {cities.map((item) => (
        <Pressable
          key={item}
          style={{
            height: 50,
            backgroundColor:
              city === item
                ? '#EEE8FF'
                : '#F7F4FF',
            borderRadius: 14,
            justifyContent: 'center',
            paddingHorizontal: 18,
            marginBottom: 8,
            borderWidth: 1,
            borderColor:
              city === item
                ? '#6C3BFF'
                : '#E8E0FF',
          }}
          onPress={() => {
            console.log('Выбран город:', item);
            setCity(item);
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color:
                city === item
                  ? '#6C3BFF'
                  : '#1B1923',
              fontWeight:
                city === item
                  ? '700'
                  : '400',
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(
            'Нажата кнопка: Завершить регистрацию'
          );

          if (!city) {
            console.log('Ошибка: город не выбран');
            return;
          }

          onFinish(city);
        }}
      >
        <Text style={styles.buttonText}>
          Завершить регистрацию
        </Text>
      </Pressable>
    </View>
  );
}