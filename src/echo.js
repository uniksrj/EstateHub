import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
window.Pusher = Pusher;

const getAuthHeaders = () => {
  const token = localStorage.getItem('chatToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: `${API_URL}/broadcasting/auth`,
  auth: {
    headers: getAuthHeaders(),
  },
});

export const refreshEchoAuth = () => {
  const auth = echo?.connector?.options?.auth || {};
  auth.headers = getAuthHeaders();
  echo.connector.options.auth = auth;
};

export default echo;
