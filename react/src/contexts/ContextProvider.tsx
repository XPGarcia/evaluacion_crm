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
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}>({
  user: null,
  token: null,
  isLoading: false,
  setUser: (user: User | null) => {},
  setToken: (token: string | null) => {},
  setIsLoading: (isLoading: boolean) => {},
});

export const ContextProvider = ({ children }: Props) => {
  const [user, _setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem(Global.userKey) ?? '{}')
  );
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem(Global.accessTokenKey)
  );

  const [isLoading, _setIsLoading] = useState(false);

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

  return (
    <StateContext.Provider
      value={{ user, token, isLoading, setUser, setToken, setIsLoading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
