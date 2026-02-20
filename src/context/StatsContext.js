import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadStats, getStatsSummary } from '../storage/statsStorage';

const StatsContext = createContext(null);

export const useStats = () => {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStats must be used within StatsProvider');
  return ctx;
};

export const StatsProvider = ({ children }) => {
  const [statsData, setStatsData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const data = await loadStats();
    setStatsData(data);
  }, []);

  useEffect(() => {
    loadStats().then((data) => {
      setStatsData(data);
      setLoaded(true);
    });
  }, []);

  const summary = getStatsSummary(statsData);

  return (
    <StatsContext.Provider value={{ statsData, summary, refresh, loaded }}>
      {children}
    </StatsContext.Provider>
  );
};
