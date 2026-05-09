import axios from 'axios';
import Constants from 'expo-constants';

/**
 * Dynamically determine the backend URL.
 * 1. Try to get the host's IP address from Expo's hostUri (works for physical devices and emulators).
 * 2. Fallback to 10.0.2.2 (Android Emulator).
 * 3. Final fallback to localhost.
 */
const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0];
const baseURL = process.env.EXPO_PUBLIC_API_URL || (debuggerHost 
  ? `http://${debuggerHost}:5000/api` 
  : 'http://10.0.2.2:5000/api');


const api = axios.create({
  baseURL,
  timeout: 10000,
});

export default api;
