import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

const OnboardingContext = createContext(null);

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
};

export const OnboardingProvider = ({ children }) => {
  const [done, setDone] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE).then((v) => {
      setDone(v === 'true');
    });
  }, []);

  const complete = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
    setDone(true);
  };

  const reset = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'false');
    setDone(false);
  };

  return (
    <OnboardingContext.Provider value={{ done, complete, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
};
