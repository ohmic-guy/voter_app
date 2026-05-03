import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../constants/theme';

export default function CheckItem({ item, checked, onToggle }) {
  return (
    <Pressable accessibilityLabel={`Checklist item ${item.title}`} onPress={onToggle} style={styles.row}>
      <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={24} color={checked ? colors.greenLight : colors.textLight} style={styles.icon} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: colors.navyMid, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm },
  icon: { marginTop: 2, marginRight: spacing.sm },
  textWrap: { flex: 1 },
  title: { color: colors.cream, fontFamily: fonts.bodySemiBold, marginBottom: spacing.xs },
  description: { color: colors.textLight, fontFamily: fonts.body, lineHeight: 20 },
});
