"use client"

import React, { createContext, useState } from 'react';

export const BagContext = createContext();

export const BagProvider = ({ initialBagData, children }) => {

  const [bagData, setBagData] = useState(initialBagData);

  return (
    <BagContext.Provider value={{ bagData, setBagData }}>
      {children}
    </BagContext.Provider>
  );
}; 
