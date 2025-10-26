import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const token = localStorage.getItem('chatToken');

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, 
  forceTLS: true,
  authEndpoint: `${API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;
