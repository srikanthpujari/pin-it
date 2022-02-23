import React, { useContext, useState } from "react";
import { createContext } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <NoteContext.Provider value={{ search, setSearch }}>
      {children}
    </NoteContext.Provider>
  );
};

export const NoteState = () => {
  return useContext(NoteContext);
};

export default NoteProvider;
