import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'nativewind';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setColorScheme(newTheme);
  };

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};