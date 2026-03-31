import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPost } from './apiClient';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

export const AuthService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const data = await apiPost<LoginPayload, LoginResponse>('/auth/login', payload);
    await AsyncStorage.setItem('auth_token', data.token);
    return data;
  },
  async logout() {
    await AsyncStorage.removeItem('auth_token');
  }
};
