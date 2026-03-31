import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppState } from '@/state/AppState';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/theme/colors';

export function PlanScreen() {
  const { state } = useAppState();

  if (!state.tripCache) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: colors.bg }}>
        <EmptyState title="No trip plan" subtitle="Trip timeline will appear here from canonical trip data." />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      {state.tripCache.timeline.map((event) => (
        <View key={event.id} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{event.title}</Text>
          <Text style={{ color: colors.muted }}>{new Date(event.startsAtIso).toLocaleString()}</Text>
          <Text style={{ color: colors.muted }}>{event.locationName || 'Location pending'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
