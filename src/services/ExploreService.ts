import { ExploreItem } from '@/types/models';
import { apiGet } from './apiClient';

export const ExploreService = {
  listNearby: (tripId: string) => apiGet<ExploreItem[]>(`/trips/${tripId}/explore`)
};
