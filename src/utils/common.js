import { logout } from './api';

export const userLogout = () => {
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('token');
  logout();
}
