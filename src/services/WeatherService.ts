import { apiGet } from './apiClient';

interface WeatherSummary {
  summary: string;
}

export const WeatherService = {
  getSummary: (tripId: string) => apiGet<WeatherSummary>(`/trips/${tripId}/weather`)
};
