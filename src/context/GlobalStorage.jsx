import React, { createContext, useState } from "react";

export const GlobalStorageContext = createContext();

const GlobalStorage = ({ children }) => {
  const [restaurantCode, setRestaurantCode] = useState(null);
  return (
    <GlobalStorageContext.Provider
      value={{ restaurantCode, setRestaurantCode }}
    >
      {children}
    </GlobalStorageContext.Provider>
  );
};

export default GlobalStorage;
