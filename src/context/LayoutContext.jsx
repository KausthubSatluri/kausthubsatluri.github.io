import React, { createContext, useState, useEffect, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState(() => {
    // Check local storage for saved layout, default to 'default'
    return localStorage.getItem('app-layout') || 'default';
  });

  useEffect(() => {
    // Save layout to local storage
    localStorage.setItem('app-layout', layout);
    
    // Apply data-layout attribute to document body so CSS can hook into it
    document.body.setAttribute('data-layout', layout);
  }, [layout]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
