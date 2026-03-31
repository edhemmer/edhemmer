import { ExpenseDraft } from '@/types/models';
import { apiGet, apiPost } from './apiClient';

export const ExpenseService = {
  list: (tripId: string) => apiGet<ExpenseDraft[]>(`/trips/${tripId}/expenses`),
  create: (tripId: string, payload: ExpenseDraft) => apiPost<ExpenseDraft, ExpenseDraft>(`/trips/${tripId}/expenses`, payload)
};
