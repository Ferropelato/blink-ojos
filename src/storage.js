import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

export const loadSettings = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    const data = await AsyncStorage.multiGet(keys);
    const raw = Object.fromEntries(data);
    const get = (storageKey, def) => raw[storageKey] ?? def;
    return {
      interval: parseInt(get(STORAGE_KEYS.INTERVAL, '45'), 10),
      duration: parseInt(get(STORAGE_KEYS.DURATION, '120'), 10),
      inactivity: parseInt(get(STORAGE_KEYS.INACTIVITY, '10'), 10),
      respectDnd: get(STORAGE_KEYS.RESPECT_DND, 'true') !== 'false',
      scheduleEnabled: get(STORAGE_KEYS.SCHEDULE_ENABLED, 'false') === 'true',
      scheduleStart: parseInt(get(STORAGE_KEYS.SCHEDULE_START, '9'), 10),
      scheduleEnd: parseInt(get(STORAGE_KEYS.SCHEDULE_END, '18'), 10),
      scheduleDays: get(STORAGE_KEYS.SCHEDULE_DAYS, '1,2,3,4,5'),
      quietStart: parseInt(get(STORAGE_KEYS.QUIET_START, '22'), 10),
      quietEnd: parseInt(get(STORAGE_KEYS.QUIET_END, '7'), 10),
      flashOpacity: parseFloat(get(STORAGE_KEYS.FLASH_OPACITY, '0.08')),
      stimulusType: get(STORAGE_KEYS.STIMULUS_TYPE, 'flash'),
      soundEnabled: get(STORAGE_KEYS.SOUND_ENABLED, 'false') === 'true',
      fontScale: parseFloat(get(STORAGE_KEYS.FONT_SCALE, '1')),
      devicePreset: get(STORAGE_KEYS.DEVICE_PRESET, 'auto'),
      proximityPause: get(STORAGE_KEYS.PROXIMITY_PAUSE, 'true') !== 'false',
      distanceReminder: get(STORAGE_KEYS.DISTANCE_REMINDER, 'false') === 'true',
      respectSystemDnd: get(STORAGE_KEYS.RESPECT_SYSTEM_DND, 'false') === 'true',
      theme: get(STORAGE_KEYS.THEME, 'dark') || 'dark',
      locale: get(STORAGE_KEYS.LOCALE, 'es') || 'es',
      guidedBreaks: get(STORAGE_KEYS.GUIDED_BREAKS, 'false') === 'true',
      preset: get(STORAGE_KEYS.PRESET, 'none') || 'none',
    };
  } catch {
    return {
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
    };
  }
};

export const saveSettings = async (settings) => {
  try {
    const pairs = [
      [STORAGE_KEYS.INTERVAL, String(settings.interval)],
      [STORAGE_KEYS.DURATION, String(settings.duration)],
      [STORAGE_KEYS.INACTIVITY, String(settings.inactivity)],
      [STORAGE_KEYS.RESPECT_DND, String(settings.respectDnd)],
      [STORAGE_KEYS.SCHEDULE_ENABLED, String(settings.scheduleEnabled)],
      [STORAGE_KEYS.SCHEDULE_START, String(settings.scheduleStart)],
      [STORAGE_KEYS.SCHEDULE_END, String(settings.scheduleEnd)],
      [STORAGE_KEYS.SCHEDULE_DAYS, settings.scheduleDays],
      [STORAGE_KEYS.QUIET_START, String(settings.quietStart)],
      [STORAGE_KEYS.QUIET_END, String(settings.quietEnd)],
      [STORAGE_KEYS.FLASH_OPACITY, String(settings.flashOpacity)],
      [STORAGE_KEYS.STIMULUS_TYPE, settings.stimulusType || 'flash'],
      [STORAGE_KEYS.SOUND_ENABLED, String(settings.soundEnabled)],
      [STORAGE_KEYS.FONT_SCALE, String(settings.fontScale || 1)],
      [STORAGE_KEYS.DEVICE_PRESET, settings.devicePreset || 'auto'],
      [STORAGE_KEYS.PROXIMITY_PAUSE, String(settings.proximityPause !== false)],
      [STORAGE_KEYS.DISTANCE_REMINDER, String(settings.distanceReminder === true)],
      [STORAGE_KEYS.RESPECT_SYSTEM_DND, String(settings.respectSystemDnd === true)],
      [STORAGE_KEYS.THEME, settings.theme || 'dark'],
      [STORAGE_KEYS.LOCALE, settings.locale || 'es'],
      [STORAGE_KEYS.GUIDED_BREAKS, String(settings.guidedBreaks === true)],
      [STORAGE_KEYS.PRESET, settings.preset || 'none'],
    ];
    await AsyncStorage.multiSet(pairs);
  } catch (e) {
    console.warn('Error saving settings:', e);
  }
};
