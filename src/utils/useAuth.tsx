// ChatGPT change for auth0-web is deprecated

import { useState, useEffect } from 'react';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

interface AuthContextState {
  isAuthenticated: boolean;
  user: any; // Replace `any` with appropriate user type
  login: () => void;
  logout: () => void;
}

let useAuth: () => AuthContextState = () => {
  // Default implementation
  return {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}
  };
};

try {
  let auth0: Auth0Client | null = null;

  useAuth = (): AuthContextState => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const initAuth0 = async () => {
        auth0 = await createAuth0Client({
          domain: 'AUTH0_BASE_URL',
          client_id: 'AUTH0_CLIENT_ID',
          redirect_uri: window.location.origin
        });

        if (window.location.search.includes('code=')) {
          try {
            await auth0.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            console.error('Error handling redirect callback:', error);
          }
        }

        const isAuthenticated = await auth0.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0.getUser();
          setUser(user);
        }
      };

      initAuth0();

      return () => {
        if (auth0) {
          auth0.close();
        }
      };
    }, []);

    const login = async () => {
      if (auth0) {
        await auth0.loginWithRedirect();
      }
    };

    const logout = () => {
      if (auth0) {
        auth0.logout({ returnTo: window.location.origin });
      }
    };

    return { isAuthenticated, user, login, logout };
  };
} catch (error) {
  console.error('Error initializing Auth0:', error);
}

export default useAuth;
