/**
 * API Configuration
 * Centralized API endpoint configuration
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Contact
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact/submit`,
  CONTACT_GET: (id: string) => `${API_BASE_URL}/api/contact/${id}`,
  CONTACT_LIST: `${API_BASE_URL}/api/contact`,
  
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  AUTH_REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  
  // Courses
  COURSES_LIST: `${API_BASE_URL}/api/courses`,
  COURSES_GET: (id: string) => `${API_BASE_URL}/api/courses/${id}`,
  COURSES_ENROLL: (id: string) => `${API_BASE_URL}/api/courses/${id}/enroll`,
  COURSES_RECOMMENDATIONS: (userId: string) => `${API_BASE_URL}/api/courses/recommendations/${userId}`,
  
  // Users
  USERS_PROFILE: `${API_BASE_URL}/api/users/profile`,
  USERS_GET: (id: string) => `${API_BASE_URL}/api/users/${id}`,
  USERS_UPDATE: `${API_BASE_URL}/api/users/profile`,
};

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: string;
  };
  timestamp: string;
}

/**
 * Fetch wrapper with error handling
 */
export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        details: message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
