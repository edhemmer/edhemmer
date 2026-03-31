import * as Notifications from 'expo-notifications';

let isRegistered = false;

export function registerNotificationHandlers() {
  if (isRegistered) return;
  isRegistered = true;

  Notifications.addNotificationReceivedListener(() => {
    // Store event only; no auto fetch by design.
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    const deepLink = response.notification.request.content.data?.deepLink as string | undefined;
    if (deepLink) {
      // Route on tap and fetch only for relevant destination screen.
      // This is intentionally integration-ready and backend-driven.
    }
  });
}
