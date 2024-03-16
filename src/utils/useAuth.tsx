// Gemini prompt NextJS 14 typescript webpack 5 auth0 jest testing-library render csv
import { useState, useEffect } from 'react';
import createWebStorage from 'auth0-web';

interface AuthContextState {
  isAuthenticated: boolean;
  user: any; // Replace `any` with appropriate user type
  login: () => void;
  logout: () => void;
}

const storage = createWebStorage();

const useAuth = (): AuthContextState => {
  const [isAuthenticated, setIsAuthenticated] = useState(storage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(storage.getItem('user'));

  useEffect(() => {
    const handleRedirectCallback = () => {
      setIsAuthenticated(true);
      setUser(window.location.hash.substring(1).split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        acc[key] = value;
        return acc;
      }, {}));
    };

    // Handle the redirect callback from Auth0
    if (window.location.hash) {
      handleRedirectCallback();
    } else {
      const isLoggedIn = storage.getItem('isLoggedIn');
      setIsAuthenticated(isLoggedIn === 'true');
      setUser(storage.getItem('user'));
    }

    const unsubscribe = storage.on('change', (event: { key: string; newValue: string; }) => {
      if (event.key === 'isLoggedIn') {
        setIsAuthenticated(event.newValue === 'true');
      }
      if (event.key === 'user') {
        setUser(event.newValue);
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    storage.authorize({
      redirectUri: window.location.origin,
    });
  };

  const logout = async () => {
    storage.clear();
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to logout URL (optional)
  };

  return { isAuthenticated, user, login, logout };
};

export default useAuth;
