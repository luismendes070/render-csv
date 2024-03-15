// ChatGPT Auth0
// components/Auth0LoginButton.tsx

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material'; // Assuming you're using Material-UI for UI components

const Auth0LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <>
      {!isAuthenticated && (
        <Button variant="contained" onClick={handleLogin}>
          Login with Auth0
        </Button>
      )}
    </>
  );
};

export default Auth0LoginButton;
