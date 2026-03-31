import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAppState } from '@/state/AppState';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/theme/colors';

export function ExpensesScreen() {
  const { state, dispatch } = useAppState();

  const addExpense = () => {
    const draft = {
      id: `exp-${Date.now()}`,
      amount: 42.0,
      currency: 'USD',
      merchant: 'Sample Merchant',
      createdAtIso: new Date().toISOString()
    };
    dispatch({ type: 'queueExpense', payload: draft });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: colors.muted }}>Sync status: {state.syncStatus}</Text>
      </View>
      <Pressable style={{ backgroundColor: colors.action, borderRadius: 12, padding: 14, marginBottom: 12 }} onPress={addExpense}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Add Expense</Text>
      </Pressable>
      {!state.expensesCache.length ? (
        <EmptyState title="No expenses" subtitle="Add an expense to start tracking spend." />
      ) : (
        state.expensesCache.map((expense) => (
          <View key={expense.id} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{expense.merchant}</Text>
            <Text style={{ color: colors.muted }}>{expense.amount.toFixed(2)} {expense.currency}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
