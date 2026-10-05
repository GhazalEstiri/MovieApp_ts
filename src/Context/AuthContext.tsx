import { createContext, useState } from "react";
import type { ReactNode } from "react";
type Childrencontext = {
  children: ReactNode;
};
interface User {
  name: string;
  email: string;
}
interface State {
  user?: User | null;
 
  login: (name: string, email: string) => void;
  logout: () => void;
}
const initialState: State = {
  user: null,
 login:()=>{},
 logout:()=>{}
};
export const AuthContext = createContext<State>(initialState);

function AuthProvider({ children }: Childrencontext) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (name: string, email: string) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
