import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  return (
    <TodoContext.Provider value={{ shouldRefetch, setShouldRefetch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useRefetch = () => useContext(TodoContext);
