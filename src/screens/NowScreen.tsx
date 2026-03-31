import React, { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAppState } from '@/state/AppState';
import { OfflineBanner } from '@/components/OfflineBanner';
import { EmptyState } from '@/components/EmptyState';
import { IntelligenceCard } from '@/components/IntelligenceCard';
import { IntelligenceService } from '@/services/IntelligenceService';
import { WeatherService } from '@/services/WeatherService';
import { colors } from '@/theme/colors';

export function NowScreen() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (!state.activeTripId || state.isOffline) return;
    IntelligenceService.getForTrip(state.activeTripId).then((cards) => {
      dispatch({ type: 'setIntelligence', payload: cards.slice(0, 2) });
    });
    WeatherService.getSummary(state.activeTripId).then((weather) => {
      if (state.tripCache) {
        dispatch({
          type: 'setTrip',
          payload: { ...state.tripCache, weatherSummary: weather.summary }
        });
      }
    });
  }, [state.activeTripId]);

  const nextEvent = useMemo(() => {
    const now = Date.now();
    return state.tripCache?.timeline
      .filter((e) => new Date(e.startsAtIso).getTime() > now)
      .sort((a, b) => +new Date(a.startsAtIso) - +new Date(b.startsAtIso))[0];
  }, [state.tripCache]);

  if (!state.tripCache) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
        <OfflineBanner visible={state.isOffline} />
        <EmptyState title="No active trip" subtitle="Connect your account or create a trip from the web app." />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <OfflineBanner visible={state.isOffline} />
      <Text style={{ fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 }}>What matters now</Text>

      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <Text style={{ color: colors.muted }}>Next Event</Text>
        <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: '700' }}>{nextEvent?.title || 'No upcoming event'}</Text>
        {nextEvent ? <Text style={{ color: colors.action }}>{Math.max(0, Math.floor((new Date(nextEvent.startsAtIso).getTime() - Date.now()) / 60000))} min</Text> : null}
      </View>

      <View style={{ marginBottom: 12 }}>
        {state.intelligenceCache.map((card) => (
          <IntelligenceCard key={card.id} card={card} />
        ))}
      </View>

      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <Text style={{ color: colors.muted }}>Weather</Text>
        <Text style={{ color: colors.textPrimary }}>{state.tripCache.weatherSummary || 'Weather not available offline'}</Text>
      </View>

      <Pressable style={{ backgroundColor: colors.action, borderRadius: 12, padding: 14, marginBottom: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Route Action</Text>
      </Pressable>
      <Pressable style={{ backgroundColor: colors.card, borderRadius: 12, padding: 14 }}>
        <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Quick Actions</Text>
      </Pressable>
    </ScrollView>
  );
}
