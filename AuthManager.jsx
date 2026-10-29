import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem('user')) || null
  );
  const [token, setToken] = useState(
    sessionStorage.getItem('token') || null
  );

  const Login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    sessionStorage.setItem('user',  JSON.stringify(userData));
    sessionStorage.setItem('token', tokenValue);
  };

  const Logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    
  };

  return (
    <AuthContext.Provider value={{ user, token, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
