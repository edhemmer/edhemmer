import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { EmptyState } from '@/components/EmptyState';
import { ExploreService } from '@/services/ExploreService';
import { useAppState } from '@/state/AppState';
import { ExploreItem } from '@/types/models';
import { colors } from '@/theme/colors';

export function ExploreScreen() {
  const { state } = useAppState();
  const [sessionCache, setSessionCache] = useState<ExploreItem[] | null>(null);

  useEffect(() => {
    if (!state.activeTripId || state.isOffline || sessionCache) return;
    ExploreService.listNearby(state.activeTripId).then(setSessionCache);
  }, [state.activeTripId, state.isOffline, sessionCache]);

  const items = sessionCache || [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      {!items.length ? (
        <EmptyState title="No nearby options" subtitle="Try again when online or in a denser area." />
      ) : (
        items.map((item) => (
          <View key={item.id} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{item.name}</Text>
            <Text style={{ color: colors.muted }}>{item.category}</Text>
            {item.requiresReservation ? <Text style={{ color: colors.attention }}>Reservation recommended</Text> : null}
          </View>
        ))
      )}
    </ScrollView>
  );
}
