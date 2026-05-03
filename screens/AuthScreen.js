import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from '../services/auth';
import { colors, fonts, spacing } from '../constants/theme';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const submit = async () => {
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (e) {
      Alert.alert('Authentication failed', e.message || 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indian Election Assistant</Text>
      <Text style={styles.subtitle}>{mode === 'login' ? 'Sign in to continue' : 'Create your account'}</Text>
      <TextInput accessibilityLabel="Email" style={styles.input} placeholder="Email" placeholderTextColor={colors.textLight} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput accessibilityLabel="Password" style={styles.input} placeholder="Password" placeholderTextColor={colors.textLight} secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable accessibilityLabel="Submit auth" style={styles.button} onPress={submit}><Text style={styles.buttonText}>{mode === 'login' ? 'Login' : 'Sign Up'}</Text></Pressable>
      <Pressable accessibilityLabel="Toggle auth mode" onPress={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}><Text style={styles.switchText}>{mode === 'login' ? 'No account? Create one' : 'Already have an account? Login'}</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, justifyContent: 'center', padding: spacing.lg },
  title: { color: colors.cream, fontFamily: fonts.display, fontSize: 30, marginBottom: spacing.sm },
  subtitle: { color: colors.textLight, fontFamily: fonts.body, marginBottom: spacing.lg },
  input: { backgroundColor: colors.navyMid, borderRadius: 12, color: colors.cream, padding: spacing.md, marginBottom: spacing.sm, fontFamily: fonts.body },
  button: { backgroundColor: colors.saffron, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginTop: spacing.sm },
  buttonText: { color: colors.navy, fontFamily: fonts.bodySemiBold },
  switchText: { color: colors.saffronLight, textAlign: 'center', marginTop: spacing.md, fontFamily: fonts.body },
});
