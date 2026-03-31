import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateProvider } from '@/state/AppState';
import { RootTabs } from '@/navigation/RootTabs';
import { registerNotificationHandlers } from '@/utils/notifications';

registerNotificationHandlers();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer>
          <RootTabs />
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
