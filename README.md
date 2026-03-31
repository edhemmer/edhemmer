# Real Travel 2 Real Places iOS App (Draftbit Production Build v1.0.1)

Production-ready Expo/React Native iOS architecture for the TRM execution, compass, and intelligence delivery layer.

## Core Guarantees

- Backend is the single source of truth (no duplicated trip business logic).
- App state is centralized and integration-ready.
- Launch flow is cache-first: render immediately from local data, then fetch only when needed.
- Offline behavior supports cached trip usage and queued expense sync.
- No polling/background refresh loops.

## Global State

Managed in `src/state/AppState.tsx`:

- `authState`
- `activeTripId`
- `tripCache`
- `lastSyncTimestamp`
- `isOffline`
- `syncStatus` (`synced | stale | pending`)

Also persisted:

- auth/session
- active trip id
- trip snapshot
- intelligence cache
- expenses cache
- offline expense queue

## Services

- `AuthService`
- `TripService`
- `IntelligenceService`
- `ExploreService`
- `WeatherService`
- `ExpenseService`

Each screen reads only its required service.

## Screens

Bottom tabs (NOW default):

1. NOW
2. PLAN
3. EXPLORE
4. EXPENSES
5. MORE

## Notification Policy

- On receive: store event only (no immediate fetch).
- On tap: deep link to relevant screen and fetch there.

## Run

```bash
npm install
npm run ios
```
