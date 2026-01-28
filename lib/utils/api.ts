/**
 * API Configuration
 * Centralized API endpoint configuration
 */

const API_BASE_URL = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Contact
  CONTACT_SUBMIT: '/api/contact',
  CONTACT_LIST: '/api/contact',
  CONTACT_GET: (id: string) => `/api/contact/${id}`,
  
  // Auth
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  
  // Courses
  COURSES_LIST: '/api/courses',
  COURSES_GET: (id: string) => `/api/courses/${id}`,
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
