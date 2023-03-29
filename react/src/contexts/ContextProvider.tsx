import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../types/user.type';
import { Global } from '../utils/global';

interface Props {
  children: ReactNode;
}

const StateContext = createContext<{
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}>({
  user: null,
  token: null,
  setUser: (user: User | null) => {},
  setToken: (token: string | null) => {},
});

export const ContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem(Global.accessTokenKey)
  );

  const setToken = (token: string | null) => {
    _setToken(token);

    if (token) {
      localStorage.setItem(Global.accessTokenKey, token);
    } else {
      localStorage.removeItem(Global.accessTokenKey);
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
