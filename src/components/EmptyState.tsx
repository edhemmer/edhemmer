import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, marginVertical: 10 }}>
      <Text style={{ fontWeight: '700', color: colors.textPrimary, marginBottom: 6 }}>{title}</Text>
      <Text style={{ color: colors.muted }}>{subtitle}</Text>
    </View>
  );
}
