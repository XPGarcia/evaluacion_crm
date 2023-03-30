import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../types/user.type';
import { Global } from '../utils/global';

interface Props {
  children: ReactNode;
}

const StateContext = createContext<{
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hasError: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  openErrorSnackbar: () => void;
}>({
  user: null,
  token: null,
  isLoading: false,
  hasError: false,
  setUser: (user: User | null) => {},
  setToken: (token: string | null) => {},
  setIsLoading: (isLoading: boolean) => {},
  openErrorSnackbar: () => {},
});

export const ContextProvider = ({ children }: Props) => {
  const [user, _setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem(Global.userKey) ?? '{}')
  );
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem(Global.accessTokenKey)
  );

  const [isLoading, _setIsLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const setUser = (user: User | null) => {
    _setUser(user);

    if (user) {
      localStorage.setItem(Global.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(Global.userKey);
    }
  };

  const setToken = (token: string | null) => {
    _setToken(token);

    if (token) {
      localStorage.setItem(Global.accessTokenKey, token);
    } else {
      localStorage.removeItem(Global.accessTokenKey);
    }
  };

  const setIsLoading = (isLoading: boolean) => {
    _setIsLoading(isLoading);
  };

  const openErrorSnackbar = () => {
    setHasError(true);

    setTimeout(() => {
      setHasError(false);
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        isLoading,
        hasError,
        setUser,
        setToken,
        setIsLoading,
        openErrorSnackbar,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
