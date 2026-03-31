export type SyncStatus = 'synced' | 'stale' | 'pending';

export interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

export interface TimelineEvent {
  id: string;
  startsAtIso: string;
  title: string;
  locationName?: string;
}

export interface TripSnapshot {
  id: string;
  destinationName: string;
  timeline: TimelineEvent[];
  weatherSummary?: string;
}

export interface IntelligenceCardModel {
  id: string;
  title: string;
  body: string;
  level: 'info' | 'attention' | 'critical';
}

export interface ExploreItem {
  id: string;
  name: string;
  category: string;
  requiresReservation: boolean;
}

export interface ExpenseDraft {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  note?: string;
  createdAtIso: string;
}

export interface AppStateModel {
  authState: AuthState;
  activeTripId: string | null;
  tripCache: TripSnapshot | null;
  lastSyncTimestamp: string | null;
  isOffline: boolean;
  syncStatus: SyncStatus;
  intelligenceCache: IntelligenceCardModel[];
  expensesCache: ExpenseDraft[];
  offlineExpenseQueue: ExpenseDraft[];
  notificationEvents: string[];
}
