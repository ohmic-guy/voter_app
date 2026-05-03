import 'react-native-gesture-handler';
import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
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
import { colors, fonts } from './constants/theme';

const Tab = createBottomTabNavigator();
const icons = { Timeline: 'time-outline', Ask: 'chatbubble-outline', Journey: 'checkbox-outline', Glossary: 'book-outline', Quiz: 'school-outline' };

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

  if (!loaded && !error) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.saffron} />
        <Text style={styles.loadingText}>Loading Indian Election Assistant...</Text>
      </View>
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
          })}
        >
          <Tab.Screen name="Timeline" component={TimelineScreen} />
          <Tab.Screen name="Ask" component={AskScreen} />
          <Tab.Screen name="Journey" component={JourneyScreen} />
          <Tab.Screen name="Glossary" component={GlossaryScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />
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
});
