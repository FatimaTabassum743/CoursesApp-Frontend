import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null); // "student" | "teacher"
  const [hasChosenRole, setHasChosenRole] = useState(false);

  const chooseRole = (nextRole) => {
    setRole(nextRole);
    setHasChosenRole(true);
  };

  return (
    <RoleContext.Provider value={{ role, hasChosenRole, chooseRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};


