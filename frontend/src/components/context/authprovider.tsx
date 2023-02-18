import { createContext, useState } from "react";

type AuthContextType = {
  auth: {
    username: string;
    accessToken: string;
    role: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      username: string;
      accessToken: string;
      role: string;
    }>
  >;
};

const AuthContext = createContext<AuthContextType>({
  auth: {
    username: "",
    accessToken: "",
    role: "",
  },
  setAuth: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({
    username: "",
    accessToken: "",
    role: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
