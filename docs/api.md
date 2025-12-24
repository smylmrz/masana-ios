# Habit Tracker API Documentation

Base URL: `https://your-domain.com/api/v1`

## Authentication

All authenticated endpoints require the `Authorization` header:

```
Authorization: Bearer YOUR_TOKEN
```

---

## Login

Authenticate a user and receive an access token.

### Endpoint

```
POST /auth/login
```

### Headers

| Header | Value |
|--------|-------|
| Content-Type | application/json |
| Accept | application/json |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

### Example Request

```javascript
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
```

### Success Response (200 OK)

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified_at": "2025-01-15T10:30:00.000000Z",
    "is_pro": false,
    "is_admin": false,
    "streak": 5,
    "remaining_habits": 2,
    "available_freezes": 5,
    "created_at": "2025-01-01T00:00:00.000000Z"
  },
  "token": "1|abc123xyz..."
}
```

### Error Response (422 Unprocessable Entity)

```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

### React Native Usage

```typescript
// api/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = __DEV__
  ? 'http://192.168.1.100:8000/api/v1'
  : 'https://your-domain.com/api/v1';

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();

  // Store token securely
  await AsyncStorage.setItem('auth_token', data.token);

  return data;
}
```
