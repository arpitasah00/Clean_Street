// src/api/client.js

const API_BASE_URL = 'http://localhost:8000';

export async function api(path, { method = 'GET', body } = {}) {
  // 1. Get the token directly from localStorage on every request
  const token = localStorage.getItem('token');
  
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const headers = {};

  // 2. Add the Content-Type header only if it's not FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  // 3. If a token exists, add the Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
  });

  if (!res.ok) {
    // Try to parse the error message from the backend
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed (${res.status})`);
  }

  // If the response has no content, return a success indicator
  if (res.status === 204) {
      return { success: true };
  }
  
  return res.json();
}