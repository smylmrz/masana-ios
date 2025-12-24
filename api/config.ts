import Constants from 'expo-constants';

const getApiUrl = (): string => {
  // Check for environment variable first (set in app.json or .env)
  const envUrl = Constants.expoConfig?.extra?.apiUrl;
  if (envUrl) {
    return envUrl;
  }

  // Fallback based on development mode
  if (__DEV__) {
    // Local development - adjust this to your local dev URL
    return 'https://habit-tracker.test/api/v1';
  }

  // Production
  return 'https://masana.app/api/v1';
};

export const API_URL = getApiUrl();
