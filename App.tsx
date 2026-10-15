import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type ScreenType =
  | 'login'
  | 'register'
  | 'city'
  | 'Home'
  | 'Catalog'
  | 'Detail'
  | 'Cart'
  | 'Profile';

interface Flower {
  id: string;
  name: string;
  price: string;
  category: string;
  icon: string;
  desc: string;
}

const FLOWERS_DATA: Flower[] = [
  {
    id: '1',
    name: 'Қызыл раушан шоғы (25 шт)',
    price: '15 000 ₸',
    category: 'Раушан',
    icon: '🌹',
    desc: 'Мінсіз таңдалған премиум класты қызыл раушандар букеті. Жақындарыңызға ерекше сыйлық!',
  },
  {
    id: '2',
    name: 'Нәзік пиондар жиынтығы',
    price: '22 000 ₸',
    category: 'Пион',
    icon: '🌸',
    desc: 'Жұпар иісті және өте әдемі пион гүлдерінен жасалған сәнді композиция.',
  },
  {
    id: '3',
    name: 'Тюльпандар көктемгі шоғы',
    price: '12 500 ₸',
    category: 'Тюльпан',
    icon: '🌷',
    desc: 'Көктемгі көңіл-күй сыйлайтын жарқын түсті тюльпандар букеті.',
  },
  {
    id: '4',
    name: 'Ақ раушан мен эустома',
    price: '18 000 ₸',
    category: 'Раушан',
    icon: '💐',
    desc: 'Тазалық пен нәзіктікті білдіретін әдемі үйлесімді букет.',
  },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('login');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Алматы');
  const [address, setAddress] = useState('');
  const [cities] = useState(['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Ақтөбе']);

  const [selectedCategory, setSelectedCategory] = useState('Барлығы');
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [cart, setCart] = useState<Flower[]>([]);

  const categories = ['Барлығы', 'Раушан', 'Пион', 'Тюльпан'];

  const handleBack = () => {
    if (screen === 'register') setScreen('login');
    else if (screen === 'city') setScreen('register');
    else if (['Catalog', 'Cart', 'Profile'].includes(screen)) setScreen('Home');
    else if (screen === 'Detail') setScreen('Catalog');
  };

  const addToCart = (flower: Flower) => {
    setCart([...cart, flower]);
    Alert.alert('Сәтті!', 'Гүл себетке қосылды 🛍️');
  };

  const handleCheckout = () => {
    if (!address) {
      Alert.alert('Қате', 'Жеткізу мекенжайын енгізіңіз!');
      return;
    }
    Alert.alert('Тапсырыс қабылданды! 🎉', `Курьер жақын арада ${address} мекенжайына жеткізеді.`);
    setCart([]);
    setScreen('Home');
  };

  const filteredFlowers = FLOWERS_DATA.filter(f => {
    return selectedCategory === 'Барлығы' || f.category === selectedCategory;
  });

  const isAuthScreen = ['login', 'register', 'city'].includes(screen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* 1. КІРУ */}
      {screen === 'login' && (
        <View style={styles.container}>
          <Text style={styles.title}>Гүлдер әлемі 💐</Text>
          <Text style={styles.subtitle}>Онлайн гүл дүкені мен жылдам жеткізу.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>📞</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Телефон нөмірі"
              placeholderTextColor="#AAA9B2"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Құпия сөз"
              placeholderTextColor="#AAA9B2"
              secureTextEntry
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setScreen('Home')}>
            <Text style={styles.loginBtnText}>Кіру</Text>
          </Pressable>

          <Pressable onPress={() => setScreen('register')} style={{ alignItems: 'center', marginTop: 14 }}>
            <Text style={styles.footerLink}>Аккаунтыңыз жоқ па? Тіркелу</Text>
          </Pressable>
        </View>
      )}

      {/* 2. ТІРКЕЛУ */}
      {screen === 'register' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Тіркелу</Text>
          <Text style={styles.subtitle}>Жеке деректеріңізді енгізіңіз</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>👤</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Аты-жөніңіз"
              placeholderTextColor="#AAA9B2"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>📞</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Телефон нөмірі"
              placeholderTextColor="#AAA9B2"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Құпия сөз"
              placeholderTextColor="#AAA9B2"
              secureTextEntry
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setScreen('city')}>
            <Text style={styles.loginBtnText}>Әрі қарай</Text>
          </Pressable>
        </View>
      )}

      {/* 3. ҚАЛА ТАНДАУ */}
      {screen === 'city' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Қаланы таңдаңыз</Text>
          <Text style={styles.subtitle}>Жеткізу қаласы</Text>

          <View style={{ flex: 1, marginTop: 10 }}>
            {cities.map((item, index) => (
              <Pressable
                key={index}
                style={styles.cityItem}
                onPress={() => setCity(item)}
              >
                <Text style={[styles.cityText, city === item && styles.selectedCityText]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={[styles.loginBtn, { marginBottom: 30 }]}
            onPress={() => setScreen('Home')}
          >
            <Text style={styles.loginBtnText}>Аяқтау</Text>
          </Pressable>
        </View>
      )}

      {/* 4. БАСТЫ БЕТ ЖӘНЕ КАТАЛОГ */}
      {!isAuthScreen && screen !== 'Detail' && screen !== 'Cart' && screen !== 'Profile' && (
        <View style={styles.appMainContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🌸 Гүлдер әлемі ({city})</Text>
            <Pressable onPress={() => setScreen('Cart')}>
              <Text style={styles.headerSubtitle}>🛒 Себет ({cart.length})</Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            {screen === 'Home' && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeCard}>
                  <Text style={styles.welcomeText}>Қош келдіңіз, {name || 'Қонақ'}! 🌷</Text>
                  <Text style={styles.welcomeSub}>Жақындарыңызға ең әдемі гүлдерді сыйлаңыз.</Text>
                </View>

                <Pressable style={styles.addBanner} onPress={() => setScreen('Catalog')}>
                  <Text style={styles.addBannerText}>💐 Гүлдер каталогын ашу</Text>
                </Pressable>

                <Text style={styles.sectionTitle}>Танымал букеттер</Text>

                {FLOWERS_DATA.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.flowerCard}
                    onPress={() => {
                      setSelectedFlower(item);
                      setScreen('Detail');
                    }}
                  >
                    <Text style={styles.flowerEmoji}>{item.icon}</Text>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <Text style={styles.flowerCategory}>{item.category}</Text>
                      <Text style={styles.flowerName}>{item.name}</Text>
                      <Text style={styles.flowerPrice}>{item.price}</Text>
                    </View>
                    <Text style={{ fontSize: 18, color: '#A811DA', fontWeight: 'bold' }}>›</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {screen === 'Catalog' && (
              <ScrollView>
                <Text style={styles.title}>Каталог</Text>
                <Text style={styles.subtitle}>Санаттар бойынша таңдаңыз</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                  {categories.map((cat, idx) => (
                    <Pressable
                      key={idx}
                      style={[styles.categoryChip, selectedCategory === cat && styles.activeCategoryChip]}
                      onPress={() => setSelectedCategory(cat)}
                    >
                      <Text style={[styles.categoryChipText, selectedCategory === cat && styles.activeCategoryChipText]}>
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>

                {filteredFlowers.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.flowerCard}
                    onPress={() => {
                      setSelectedFlower(item);
                      setScreen('Detail');
                    }}
                  >
                    <Text style={styles.flowerEmoji}>{item.icon}</Text>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <Text style={styles.flowerCategory}>{item.category}</Text>
                      <Text style={styles.flowerName}>{item.name}</Text>
                      <Text style={styles.flowerPrice}>{item.price}</Text>
                    </View>
                    <Text style={{ fontSize: 18, color: '#A811DA', fontWeight: 'bold' }}>›</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>

          {/* НАВИГАЦИЯ */}
          <View style={styles.navbar}>
            <Pressable style={styles.navItem} onPress={() => setScreen('Home')}>
              <Text style={[styles.navText, screen === 'Home' && styles.activeNavText]}>🏠 Басты</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => setScreen('Catalog')}>
              <Text style={[styles.navText, screen === 'Catalog' && styles.activeNavText]}>💐 Каталог</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => setScreen('Cart')}>
              <Text style={[styles.navText, screen === 'Cart' && styles.activeNavText]}>🛒 Себет</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => setScreen('Profile')}>
              <Text style={[styles.navText, screen === 'Profile' && styles.activeNavText]}>👤 Профиль</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* 5. ГҮЛ ТУРАЛЫ ТОЛЫҚ АҚПАРАТ (DETAIL) */}
      {screen === 'Detail' && selectedFlower && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 72, marginBottom: 10 }}>{selectedFlower.icon}</Text>
            <Text style={styles.title}>{selectedFlower.name}</Text>
            <Text style={styles.flowerPriceLarge}>{selectedFlower.price}</Text>
          </View>

          <View style={styles.descCard}>
            <Text style={styles.descTitle}>Сипаттамасы:</Text>
            <Text style={styles.descText}>{selectedFlower.desc}</Text>
          </View>

          <Pressable style={styles.loginBtn} onPress={() => addToCart(selectedFlower)}>
            <Text style={styles.loginBtnText}>Себетке қосу 🛍️</Text>
          </Pressable>
        </View>
      )}

      {/* 6. СЕБЕТ ЖӘНЕ ДОСТАВКА (CART) */}
      {screen === 'Cart' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Себет</Text>
          <Text style={styles.subtitle}>Таңдалған гүлдер мен жеткізу</Text>

          {cart.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#AAA9B2', marginTop: 40, fontSize: 16 }}>
              Себетіңіз бос 🛒
            </Text>
          ) : (
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
              {cart.map((item, idx) => (
                <View key={idx} style={styles.flowerCard}>
                  <Text style={styles.flowerEmoji}>{item.icon}</Text>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.flowerName}>{item.name}</Text>
                    <Text style={styles.flowerPrice}>{item.price}</Text>
                  </View>
                </View>
              ))}

              <View style={[styles.inputContainer, { marginTop: 20 }]}>
                <TextInput
                  style={[styles.input, { marginLeft: 0 }]}
                  placeholder="Жеткізу мекенжайы (көше, үй, пәтер)"
                  placeholderTextColor="#AAA9B2"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <Pressable style={styles.loginBtn} onPress={handleCheckout}>
                <Text style={styles.loginBtnText}>Тапсырыс беру 🚚</Text>
              </Pressable>
            </ScrollView>
          )}
        </View>
      )}

      {/* 7. ПРОФИЛЬ */}
      {screen === 'Profile' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 36 }}>🌸</Text>
            </View>
            <Text style={styles.title}>{name || 'Қолданушы'}</Text>
            <Text style={styles.subtitle}>{phone || '+7 (700) 000 00 00'}</Text>
            <Text style={styles.termsText}>Қала: {city}</Text>
          </View>

          <Pressable
            style={[styles.loginBtn, { marginTop: 'auto', marginBottom: 30, backgroundColor: '#ff4757' }]}
            onPress={() => setScreen('login')}
          >
            <Text style={styles.loginBtnText}>Шығу</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 10, backgroundColor: '#FFFFFF' },
  appMainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 16, backgroundColor: '#F8F8FA', borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B1923' },
  headerSubtitle: { fontSize: 14, fontWeight: 'bold', color: '#A811DA' },
  content: { flex: 1, padding: 20 },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start', marginBottom: 24 },
  backButtonText: { fontSize: 32, color: '#1B1923', fontWeight: '300' },
  title: { color: '#1B1923', fontSize: 27, fontWeight: '700', lineHeight: 34 },
  subtitle: { color: '#AAA9B2', fontSize: 16, marginTop: 3, marginBottom: 29 },
  inputContainer: { width: '100%', height: 62, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FA', borderRadius: 18, paddingHorizontal: 18, marginBottom: 14 },
  inputIconText: { fontSize: 20, marginRight: 14 },
  input: { flex: 1, height: '100%', color: '#1B1923', fontSize: 18 },
  loginBtn: { marginTop: 16, width: '100%', height: 62, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#A811DA', borderRadius: 18, paddingHorizontal: 18, marginBottom: 14 },
  loginBtnText: { fontWeight: '600', fontSize: 18, color: '#FFFFFF' },
  footerLink: { color: '#A811DA', fontSize: 16, fontWeight: '600' },
  cityItem: { paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#F8F8FA', borderRadius: 12, marginBottom: 8 },
  cityText: { fontSize: 16, color: '#1B1923' },
  selectedCityText: { color: '#A811DA', fontWeight: '600' },
  welcomeCard: { backgroundColor: '#F8F8FA', borderRadius: 16, padding: 16, marginBottom: 16 },
  welcomeText: { fontSize: 18, fontWeight: 'bold', color: '#1B1923' },
  welcomeSub: { fontSize: 14, color: '#AAA9B2', marginTop: 4 },
  addBanner: { backgroundColor: '#F8F8FA', borderWidth: 1, borderColor: '#A811DA', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16 },
  addBannerText: { color: '#A811DA', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B1923', marginBottom: 12 },
  flowerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FA', borderRadius: 16, padding: 16, marginBottom: 12 },
  flowerEmoji: { fontSize: 32 },
  flowerCategory: { fontSize: 12, color: '#AAA9B2', marginBottom: 2 },
  flowerName: { fontSize: 16, fontWeight: '600', color: '#1B1923' },
  flowerPrice: { fontSize: 14, fontWeight: 'bold', color: '#A811DA', marginTop: 4 },
  flowerPriceLarge: { fontSize: 22, fontWeight: 'bold', color: '#A811DA', marginTop: 8 },
  categoryContainer: { flexDirection: 'row', marginBottom: 14 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#F8F8FA', borderRadius: 14, marginRight: 8, borderWidth: 1, borderColor: '#eee' },
  activeCategoryChip: { backgroundColor: '#A811DA' },
  categoryChipText: { color: '#1B1923', fontWeight: '600', fontSize: 14 },
  activeCategoryChipText: { color: '#FFFFFF' },
  descCard: { backgroundColor: '#F8F8FA', borderRadius: 18, padding: 18, marginBottom: 20 },
  descTitle: { fontSize: 16, fontWeight: '700', color: '#1B1923', marginBottom: 6 },
  descText: { fontSize: 15, color: '#716F7B', lineHeight: 22 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F8F8FA', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  termsText: { fontSize: 16, color: '#716F7B', marginTop: 6 },
  navbar: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 12 },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { color: '#AAA9B2', fontSize: 12 },
  activeNavText: { color: '#A811DA', fontWeight: 'bold' },
});