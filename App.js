import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, Pressable } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold, PlayfairDisplay_900Black } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import TimelineScreen from './screens/TimelineScreen';
import AskScreen from './screens/AskScreen';
import JourneyScreen from './screens/JourneyScreen';
import GlossaryScreen from './screens/GlossaryScreen';
import QuizScreen from './screens/QuizScreen';
import NewsScreen from './screens/NewsScreen';
import AuthScreen from './screens/AuthScreen';
import { auth, onAuthStateChanged, signOut } from './services/auth';
import { colors, fonts } from './constants/theme';

const Tab = createBottomTabNavigator();
const icons = { Timeline: 'time-outline', Ask: 'chatbubble-outline', Journey: 'checkbox-outline', Glossary: 'book-outline', Quiz: 'school-outline', News: 'newspaper-outline' };

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.navy,
    card: colors.navy,
    text: colors.cream,
    border: 'rgba(255,153,51,0.2)',
  },
};

export default function App() {
  const [loaded, error] = useFonts({ PlayfairDisplay_700Bold, PlayfairDisplay_900Black, DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  if (!loaded && !error) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.saffron} />
        <Text style={styles.loadingText}>Loading Indian Election Assistant...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaProvider>
        <AuthScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: colors.saffron,
            tabBarInactiveTintColor: colors.textLight,
            sceneContainerStyle: styles.scene,
            headerStyle: styles.header,
            headerTintColor: colors.saffron,
            headerTitle: ({ children }) => <Text style={styles.headerTitle}>{children}</Text>,
            headerRight: () => (
              <Pressable accessibilityLabel="Sign out" onPress={() => signOut()} style={styles.signOutBtn}>
                <Text style={styles.signOutText}>Logout</Text>
              </Pressable>
            ),
          })}
        >
          <Tab.Screen name="Timeline" component={TimelineScreen} />
          <Tab.Screen name="Ask" component={AskScreen} />
          <Tab.Screen name="Journey" component={JourneyScreen} />
          <Tab.Screen name="Glossary" component={GlossaryScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />
          <Tab.Screen name="News" component={NewsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    color: colors.cream,
    fontSize: 16,
  },
  tabBar: { backgroundColor: colors.navy, borderTopColor: 'rgba(255,153,51,0.2)' },
  scene: { backgroundColor: colors.navy },
  header: { backgroundColor: colors.navy },
  headerTitle: { fontFamily: fonts.display, color: colors.cream, fontSize: 20 },
  signOutBtn: { marginRight: 12, backgroundColor: 'rgba(255,153,51,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  signOutText: { color: colors.saffronLight, fontFamily: fonts.bodyMedium, fontSize: 12 },
});
