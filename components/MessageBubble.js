import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';

function TypingDots() {
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  useEffect(() => {
    const animations = dots.map((dot, index) => Animated.loop(Animated.sequence([
      Animated.delay(index * 120),
      Animated.timing(dot, { toValue: -6, duration: 180, useNativeDriver: true }),
      Animated.timing(dot, { toValue: 0, duration: 180, useNativeDriver: true }),
    ])));
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [dots]);
  return <View style={styles.typingRow}>{dots.map((d,i)=><Animated.View key={i} style={[styles.dot,{transform:[{translateY:d}]}]} />)}</View>;
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.wrapper, isUser ? styles.userWrap : styles.botWrap]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        {message.typing ? <TypingDots /> : <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{message.text}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.sm }, userWrap: { alignItems: 'flex-end' }, botWrap: { alignItems: 'flex-start' },
  bubble: { maxWidth: '85%', borderRadius: 14, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  userBubble: { backgroundColor: colors.saffron }, botBubble: { backgroundColor: colors.navyMid },
  text: { fontFamily: fonts.body, lineHeight: 21 }, userText: { color: colors.navy }, botText: { color: colors.cream },
  typingRow: { flexDirection: 'row', gap: 5, alignItems: 'center', minHeight: 22 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.saffron },
});
