import { IntelligenceCardModel } from '@/types/models';
import { apiGet } from './apiClient';

export const IntelligenceService = {
  getForTrip: (tripId: string) => apiGet<IntelligenceCardModel[]>(`/trips/${tripId}/intelligence`)
};
