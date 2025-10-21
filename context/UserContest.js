import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await account.getSession("current"); //check anonymous session exists
      } catch {
        await account.createAnonymousSession(); //create anonymous if not
      }
      const userInfo = await account.get();
      setUser(userInfo);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return null;
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
