import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export function OfflineBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <View style={{ backgroundColor: colors.attention, padding: 8 }}>
      <Text style={{ color: 'white', fontWeight: '600' }}>Offline mode: showing cached trip data.</Text>
    </View>
  );
}
