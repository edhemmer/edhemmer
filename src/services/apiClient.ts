import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.realtravel2realplaces.com/v1';

async function authHeaders() {
  const token = await AsyncStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: await authHeaders()
  });
  if (!response.ok) throw new Error(`GET ${path} failed`);
  return response.json();
}

export async function apiPost<TInput, TOutput>(path: string, body: TInput): Promise<TOutput> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`POST ${path} failed`);
  return response.json();
}
