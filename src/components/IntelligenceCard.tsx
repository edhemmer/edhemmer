import React from 'react';
import { Text, View } from 'react-native';
import { IntelligenceCardModel } from '@/types/models';
import { colors } from '@/theme/colors';

const tone = {
  info: colors.action,
  attention: colors.attention,
  critical: colors.critical
};

export function IntelligenceCard({ card }: { card: IntelligenceCardModel }) {
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: tone[card.level] }}>
      <Text style={{ color: colors.intelligence, fontWeight: '700' }}>{card.title}</Text>
      <Text style={{ color: colors.textPrimary, marginTop: 4 }}>{card.body}</Text>
    </View>
  );
}
