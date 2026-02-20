import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export async function loadBlinkMonitorSessions() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.BLINK_MONITOR_SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveBlinkMonitorSession(session) {
  try {
    const sessions = await loadBlinkMonitorSessions();
    sessions.unshift(session);
    const toKeep = sessions.slice(0, 50);
    await AsyncStorage.setItem(STORAGE_KEYS.BLINK_MONITOR_SESSIONS, JSON.stringify(toKeep));
  } catch (e) {
    console.warn('Error saving blink monitor session:', e);
  }
}
