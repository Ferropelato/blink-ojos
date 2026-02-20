import React, { createContext, useContext } from 'react';
import { useSettings } from './SettingsContext';
import { getThemeColors } from '../utils/theme';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return getThemeColors('dark');
  return ctx;
};

export const ThemeProvider = ({ children }) => {
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = { ...getThemeColors(theme), theme };
  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
};
