import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '../storage';

const SettingsContext = createContext(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettingsState] = useState({
    interval: 45,
    duration: 120,
    inactivity: 10,
    respectDnd: true,
    scheduleEnabled: false,
    scheduleStart: 9,
    scheduleEnd: 18,
    scheduleDays: '1,2,3,4,5',
    quietStart: 22,
    quietEnd: 7,
    flashOpacity: 0.08,
    stimulusType: 'flash',
    soundEnabled: false,
    fontScale: 1,
    devicePreset: 'auto',
    proximityPause: true,
    distanceReminder: false,
    respectSystemDnd: false,
    theme: 'dark',
    locale: 'es',
    guidedBreaks: false,
    preset: 'none',
  });
  const [loaded, setLoaded] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    loadSettings().then((s) => {
      setSettingsState(s);
      setLoaded(true);
    });
  }, []);

  const setSettings = async (updates) => {
    const next = { ...settings, ...updates };
    setSettingsState(next);
    await saveSettings(next);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, loaded, savedFeedback }}>
      {children}
    </SettingsContext.Provider>
  );
};
