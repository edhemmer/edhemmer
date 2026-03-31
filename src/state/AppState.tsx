import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { AppStateModel, ExpenseDraft, IntelligenceCardModel, TripSnapshot } from '@/types/models';
import { ExpenseService } from '@/services/ExpenseService';

const initialState: AppStateModel = {
  authState: { token: null, userId: null, isAuthenticated: false },
  activeTripId: null,
  tripCache: null,
  lastSyncTimestamp: null,
  isOffline: false,
  syncStatus: 'stale',
  intelligenceCache: [],
  expensesCache: [],
  offlineExpenseQueue: [],
  notificationEvents: []
};

type Action =
  | { type: 'hydrate'; payload: Partial<AppStateModel> }
  | { type: 'setOffline'; payload: boolean }
  | { type: 'setTrip'; payload: TripSnapshot }
  | { type: 'setIntelligence'; payload: IntelligenceCardModel[] }
  | { type: 'setExpenses'; payload: ExpenseDraft[] }
  | { type: 'queueExpense'; payload: ExpenseDraft }
  | { type: 'expenseSynced'; payload: string }
  | { type: 'setSyncStatus'; payload: AppStateModel['syncStatus'] }
  | { type: 'addNotification'; payload: string };

function reducer(state: AppStateModel, action: Action): AppStateModel {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload };
    case 'setOffline':
      return { ...state, isOffline: action.payload };
    case 'setTrip':
      return { ...state, tripCache: action.payload, syncStatus: 'synced', lastSyncTimestamp: new Date().toISOString() };
    case 'setIntelligence':
      return { ...state, intelligenceCache: action.payload };
    case 'setExpenses':
      return { ...state, expensesCache: action.payload };
    case 'queueExpense':
      return {
        ...state,
        expensesCache: [action.payload, ...state.expensesCache],
        offlineExpenseQueue: [action.payload, ...state.offlineExpenseQueue],
        syncStatus: 'pending'
      };
    case 'expenseSynced':
      return {
        ...state,
        offlineExpenseQueue: state.offlineExpenseQueue.filter((e) => e.id !== action.payload),
        syncStatus: state.offlineExpenseQueue.length <= 1 ? 'synced' : 'pending'
      };
    case 'setSyncStatus':
      return { ...state, syncStatus: action.payload };
    case 'addNotification':
      return { ...state, notificationEvents: [action.payload, ...state.notificationEvents] };
    default:
      return state;
  }
}

interface AppStateContextValue {
  state: AppStateModel;
  dispatch: React.Dispatch<Action>;
  persistState: () => Promise<void>;
  syncQueuedExpenses: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

const KEYS = {
  auth: 'auth_state',
  activeTripId: 'active_trip_id',
  trip: 'trip_cache',
  intelligence: 'intelligence_cache',
  expenses: 'expenses_cache',
  queue: 'offline_expense_queue'
};

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((status) => {
      dispatch({ type: 'setOffline', payload: !status.isConnected });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      const [auth, activeTripId, trip, intelligence, expenses, queue] = await Promise.all([
        AsyncStorage.getItem(KEYS.auth),
        AsyncStorage.getItem(KEYS.activeTripId),
        AsyncStorage.getItem(KEYS.trip),
        AsyncStorage.getItem(KEYS.intelligence),
        AsyncStorage.getItem(KEYS.expenses),
        AsyncStorage.getItem(KEYS.queue)
      ]);

      dispatch({
        type: 'hydrate',
        payload: {
          authState: auth ? JSON.parse(auth) : initialState.authState,
          activeTripId,
          tripCache: trip ? JSON.parse(trip) : null,
          intelligenceCache: intelligence ? JSON.parse(intelligence) : [],
          expensesCache: expenses ? JSON.parse(expenses) : [],
          offlineExpenseQueue: queue ? JSON.parse(queue) : []
        }
      });
    })();
  }, []);

  const persistState = async () => {
    await Promise.all([
      AsyncStorage.setItem(KEYS.auth, JSON.stringify(state.authState)),
      AsyncStorage.setItem(KEYS.activeTripId, state.activeTripId || ''),
      AsyncStorage.setItem(KEYS.trip, JSON.stringify(state.tripCache)),
      AsyncStorage.setItem(KEYS.intelligence, JSON.stringify(state.intelligenceCache)),
      AsyncStorage.setItem(KEYS.expenses, JSON.stringify(state.expensesCache)),
      AsyncStorage.setItem(KEYS.queue, JSON.stringify(state.offlineExpenseQueue))
    ]);
  };

  const syncQueuedExpenses = async () => {
    if (state.isOffline || !state.activeTripId) return;
    for (const expense of state.offlineExpenseQueue) {
      await ExpenseService.create(state.activeTripId, expense);
      dispatch({ type: 'expenseSynced', payload: expense.id });
    }
  };

  useEffect(() => {
    persistState();
  }, [state]);

  useEffect(() => {
    syncQueuedExpenses();
  }, [state.isOffline]);

  const value = useMemo(
    () => ({ state, dispatch, persistState, syncQueuedExpenses }),
    [state]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be inside AppStateProvider');
  return context;
};
