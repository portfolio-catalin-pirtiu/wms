import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { ILoggedInUser } from '@features/userAccount';

interface IProviderProps {
  children?: any;
}

interface AuthenticationContextValue {
  user: ILoggedInUser;
  setUser: Dispatch<SetStateAction<ILoggedInUser>>;
}

const authenticationCtxDefaultValue: AuthenticationContextValue = {
  user: loadLocalStorage(),
  setUser: (user) => {},
};

function loadLocalStorage(): ILoggedInUser {
  const value = localStorage.getItem('loggedInUser');
  if (typeof value === 'string') {
    return JSON.parse(value);
  } else {
    return {
      isLoggedIn: false,
    };
  }
}

export const AuthenticationContext = createContext(
  authenticationCtxDefaultValue
);

export function AuthenticationProvider(props: IProviderProps) {
  const [user, setUser] = useState(authenticationCtxDefaultValue.user);
  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
