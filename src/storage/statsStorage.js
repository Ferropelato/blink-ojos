import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const resetStats = async () => {
  await AsyncStorage.setItem(STORAGE_KEYS.STATS_DATA, JSON.stringify({}));
};

const toDateKey = (d) => {
  const dn = d instanceof Date ? d : new Date();
  return `${dn.getFullYear()}-${String(dn.getMonth() + 1).padStart(2, '0')}-${String(dn.getDate()).padStart(2, '0')}`;
};

export const loadStats = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.STATS_DATA);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const recordSession = async (blinkCount, durationSec) => {
  const key = toDateKey(new Date());
  const data = await loadStats();
  const prev = data[key] || { blinks: 0, sessions: 0 };
  data[key] = {
    blinks: (prev.blinks || 0) + blinkCount,
    sessions: (prev.sessions || 0) + 1,
    totalDuration: (prev.totalDuration || 0) + durationSec,
  };
  await AsyncStorage.setItem(STORAGE_KEYS.STATS_DATA, JSON.stringify(data));
};

export const getStatsSummary = (data) => {
  const today = toDateKey(new Date());
  const todayDate = new Date(today);
  const weekAgo = new Date(todayDate);
  weekAgo.setDate(weekAgo.getDate() - 7);

  let blinksToday = 0;
  let sessionsToday = 0;
  let blinksThisWeek = 0;
  let sessionsThisWeek = 0;
  let totalBlinks = 0;
  let totalSessions = 0;

  const entries = Object.entries(data || {});
  for (const [dateStr, rec] of entries) {
    const blinks = rec?.blinks || 0;
    const sessions = rec?.sessions || 0;
    totalBlinks += blinks;
    totalSessions += sessions;
    if (dateStr === today) {
      blinksToday = blinks;
      sessionsToday = sessions;
    }
    const d = new Date(dateStr + 'T12:00:00');
    if (d >= weekAgo) {
      blinksThisWeek += blinks;
      sessionsThisWeek += sessions;
    }
  }

  return { blinksToday, sessionsToday, blinksThisWeek, sessionsThisWeek, totalBlinks, totalSessions };
};

export const getStatsForExport = (data) => {
  const dates = Object.keys(data || {}).sort();
  const lines = ['Fecha,Recordatorios,Sesiones'];
  for (const d of dates) {
    const r = data[d];
    lines.push(`${d},${r?.blinks || 0},${r?.sessions || 0}`);
  }
  return lines.join('\n');
};
