import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export function MoreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={{ color: colors.textPrimary, fontSize: 22, fontWeight: '700' }}>More</Text>
      <Text style={{ color: colors.muted, marginTop: 8 }}>Account, settings, and support actions.</Text>
    </View>
  );
}
