import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { API_ORIGIN } from "@/config/env"

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
  authEndpoint: `${API_ORIGIN}/broadcasting/auth`,
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
