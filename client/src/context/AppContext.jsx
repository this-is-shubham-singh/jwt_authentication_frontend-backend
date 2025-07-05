import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = { isLoggedIn, setIsLoggedIn };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
export default AppContextProvider;
