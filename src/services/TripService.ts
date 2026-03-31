import { TripSnapshot } from '@/types/models';
import { apiGet } from './apiClient';

export const TripService = {
  getTrip: (tripId: string) => apiGet<TripSnapshot>(`/trips/${tripId}`)
};
