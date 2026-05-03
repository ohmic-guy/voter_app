import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, FlatList, TextInput } from 'react-native';
import MessageBubble from '../components/MessageBubble';
import { colors, fonts, spacing } from '../constants/theme';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const systemInstruction = 'You are a friendly, nonpartisan civic education assistant specializing in the Indian election system. Explain how Indian elections work — the role of the Election Commission of India, EVMs, the Constitution, Lok Sabha vs Rajya Sabha, state elections, voter registration, MCC, NOTA, and related topics — clearly in 2–4 short paragraphs. Never express political opinions or favor any party or politician. Focus purely on constitutional and procedural facts.';
const suggestions = ['How does the EVM work?', 'What is the Model Code of Conduct?', 'What is NOTA and how do I use it?', 'What is the difference between Lok Sabha and Rajya Sabha?', 'How is the Prime Minister elected?'];

export default function AskScreen() {
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'bot', text: 'Hello! Ask me anything about Indian elections, voter rights, EVMs, or election laws.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const geminiReady = Boolean(API_KEY);

  const conversationHistory = useMemo(() => messages.filter((m) => !m.typing && m.id !== 'welcome').map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), [messages]);
  const send = async (textValue) => {
    const trimmed = textValue.trim(); if (!trimmed || loading) return;
    if (!geminiReady) {
      setMessages((prev) => [...prev, { id: `${Date.now()}-missing-key`, role: 'bot', text: 'Gemini is not configured yet. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file and restart the app.' }]);
      return;
    }
    const userMessage = { id: `${Date.now()}-user`, role: 'user', text: trimmed };
    const typingMsg = { id: `${Date.now()}-typing`, role: 'bot', typing: true, text: '' };
    setMessages((prev) => [...prev, userMessage, typingMsg]); setInput(''); setLoading(true);
    try {
      const body = { system_instruction: { parts: [{ text: systemInstruction }] }, contents: [...conversationHistory, { role: 'user', parts: [{ text: trimmed }] }] };
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a complete response. Please try again.';
      setMessages((prev) => [...prev.filter((m) => !m.typing), { id: `${Date.now()}-bot`, role: 'bot', text: botText }]);
    } catch {
      setMessages((prev) => [...prev.filter((m) => !m.typing), { id: `${Date.now()}-error`, role: 'bot', text: 'Sorry, I’m having trouble reaching Gemini right now. Please check your API key or internet connection and try again.' }]);
    } finally { setLoading(false); setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
      <View style={styles.header}><Text style={styles.title}>Ask the Election Guide</Text><Text style={styles.subtitle}>Powered by Gemini AI</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsWrap}>
        {suggestions.map((s) => <Pressable key={s} accessibilityLabel={s} style={styles.chip} onPress={() => send(s)}><Text style={styles.chipText}>{s}</Text></Pressable>)}
      </ScrollView>
      <FlatList ref={listRef} data={messages} keyExtractor={(i) => i.id} renderItem={({ item }) => <MessageBubble message={item} />} style={styles.list} contentContainerStyle={styles.listContent} onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })} />
      <View style={styles.inputRow}><TextInput accessibilityLabel="Chat input" style={styles.input} value={input} onChangeText={setInput} placeholder="Ask about Indian elections..." placeholderTextColor={colors.textLight} multiline /><Pressable accessibilityLabel="Send message" style={styles.sendBtn} onPress={() => send(input)}><Text style={styles.sendText}>Send</Text></Pressable></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.navy }, header: { padding: spacing.md }, title: { color: colors.cream, fontFamily: fonts.display, fontSize: 24 }, subtitle: { color: colors.textLight, fontFamily: fonts.body, marginTop: spacing.xs }, chipsWrap: { paddingHorizontal: spacing.md, gap: spacing.sm, paddingBottom: spacing.sm }, chip: { borderWidth: 1, borderColor: colors.saffron, borderRadius: 16, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }, chipText: { color: colors.saffron, fontFamily: fonts.bodyMedium }, list: { flex: 1 }, listContent: { padding: spacing.md, paddingBottom: spacing.xl }, inputRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,153,51,0.2)', padding: spacing.sm, gap: spacing.sm }, input: { flex: 1, backgroundColor: colors.navyMid, color: colors.cream, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontFamily: fonts.body, maxHeight: 110 }, sendBtn: { backgroundColor: colors.saffron, borderRadius: 12, paddingHorizontal: spacing.md, justifyContent: 'center' }, sendText: { color: colors.navy, fontFamily: fonts.bodySemiBold }, });
