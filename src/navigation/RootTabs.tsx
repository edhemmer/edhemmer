import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NowScreen } from '@/screens/NowScreen';
import { PlanScreen } from '@/screens/PlanScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { ExpensesScreen } from '@/screens/ExpensesScreen';
import { MoreScreen } from '@/screens/MoreScreen';
import { colors } from '@/theme/colors';

const Tab = createBottomTabNavigator();

export function RootTabs() {
  return (
    <Tab.Navigator
      initialRouteName="NOW"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.action,
        tabBarInactiveTintColor: colors.muted
      }}>
      <Tab.Screen name="NOW" component={NowScreen} />
      <Tab.Screen name="PLAN" component={PlanScreen} />
      <Tab.Screen name="EXPLORE" component={ExploreScreen} />
      <Tab.Screen name="EXPENSES" component={ExpensesScreen} />
      <Tab.Screen name="MORE" component={MoreScreen} />
    </Tab.Navigator>
  );
}
