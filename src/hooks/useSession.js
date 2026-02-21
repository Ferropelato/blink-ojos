import { useState, useRef, useCallback, useEffect } from 'react';
import { AppState, Platform, Vibration } from 'react-native';
import Constants from 'expo-constants';
import { playBlinkSound } from '../utils/sound';

const BLINK_CHANNEL_ID = 'blink-reminders';
const DISTANCE_CHANNEL_ID = 'blink-distance';
const GUIDED_BREAK_CHANNEL_ID = 'blink-guided-break';
const DISTANCE_REMINDER_INTERVAL_SEC = 900; // 15 minutos
const GUIDED_BREAK_INTERVAL_SEC = 1800; // 30 minutos
import { isWithinSchedule, isQuietHours } from '../utils/schedule';

const isExpoGo = Constants.appOwnership === 'expo';
let Notifications = null;
if (!isExpoGo) {
  try {
    const mod = require('expo-notifications');
    Notifications = mod;
    mod.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  } catch (e) {
    Notifications = null;
  }
}

export const useSession = (settings, onBlink, { onSessionEnd, externalPause = false } = {}) => {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [blinkCount, setBlinkCount] = useState(0);
  const [scheduledMode, setScheduledMode] = useState(false);
  const intervalRef = useRef(null);
  const distanceRef = useRef(null);
  const guidedBreakRef = useRef(null);
  const scheduleCheckRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const appState = useRef(AppState.currentState);
  const sessionStartRef = useRef(0);
  const blinkCountRef = useRef(0);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const stop = useCallback((clearScheduled = false) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (distanceRef.current) clearInterval(distanceRef.current);
    if (guidedBreakRef.current) clearInterval(guidedBreakRef.current);
    if (scheduleCheckRef.current) clearInterval(scheduleCheckRef.current);
    intervalRef.current = null;
    distanceRef.current = null;
    guidedBreakRef.current = null;
    scheduleCheckRef.current = null;
    if (sessionStartRef.current > 0) {
      const durationSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
      onSessionEnd?.(blinkCountRef.current, durationSec);
    }
    sessionStartRef.current = 0;
    blinkCountRef.current = 0;
    setBlinkCount(0);
    setActive(false);
    setRemaining(0);
    if (clearScheduled) setScheduledMode(false);
  }, [onSessionEnd]);

  const checkInactivity = useCallback(() => {
    if (!settings.inactivity) return false;
    const elapsed = (Date.now() - lastInteractionRef.current) / 1000 / 60;
    return elapsed >= settings.inactivity;
  }, [settings.inactivity]);

  const isInQuietHours = useCallback(() => {
    if (!settings.respectDnd) return false;
    return isQuietHours(settings.quietStart, settings.quietEnd);
  }, [settings.respectDnd, settings.quietStart, settings.quietEnd]);

  const triggerBlink = useCallback(async () => {
    if (externalPause) return;
    if (checkInactivity()) {
      stop(true);
      return;
    }
    if (isInQuietHours()) return;
    const s = settingsRef.current;
    blinkCountRef.current += 1;
    setBlinkCount((c) => c + 1);
    if (appState.current === 'active') {
      const t = s.stimulusType || 'flash';
      if (t === 'flash' || t === 'both') onBlink?.();
      if ((t === 'vibration' || t === 'both') && Platform.OS !== 'web') {
        // Patrón más perceptible: Android [delay, vibrate, delay, vibrate], iOS usa duración fija
        const pattern = Platform.OS === 'android' ? [0, 120, 80, 100] : 120;
        try {
          Vibration.vibrate(pattern);
        } catch (_) {}
      }
      if (s.soundEnabled) playBlinkSound();
    } else if (Notifications) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '👁️ Blink',
            body: 'Hora de parpadear — cuida tus ojos',
            channelId: BLINK_CHANNEL_ID,
            priority: 'high',
          },
          trigger: { seconds: 0 },
        });
      } catch (_) {}
    }
  }, [externalPause, checkInactivity, stop, onBlink, isInQuietHours]);

  const recordInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  const startSession = useCallback((fromSchedule = false) => {
    if (intervalRef.current) return;
    const s = settingsRef.current;
    lastInteractionRef.current = Date.now();
    sessionStartRef.current = Date.now();
    blinkCountRef.current = 0;
    setBlinkCount(0);
    const durationSec = s.duration ? s.duration * 60 : Number.MAX_SAFE_INTEGER;
    setRemaining(durationSec);
    setActive(true);
    setScheduledMode(fromSchedule);

    let secondsElapsed = 0;

    const tick = () => {
      const current = settingsRef.current;
      const intervalSec = current.interval;
      lastInteractionRef.current = Date.now();
      secondsElapsed += 1;
      if (intervalSec > 0 && secondsElapsed % intervalSec === 0) triggerBlink();
      setRemaining((r) => {
        const next = r - 1;
        if (next <= 0) stop(true);
        return next;
      });
    };

    intervalRef.current = setInterval(tick, 1000);

    if (s.distanceReminder && Notifications) {
      let distanceSeconds = 0;
      const distanceTick = () => {
        distanceSeconds += 1;
        if (distanceSeconds >= DISTANCE_REMINDER_INTERVAL_SEC) {
          distanceSeconds = 0;
          const nowSettings = settingsRef.current;
          if (!nowSettings.distanceReminder) return;
          if (isInQuietHours()) return;
          if (appState.current === 'active') {
            Notifications.scheduleNotificationAsync({
              content: {
                title: '📏 Blink',
                body: 'Aleja el dispositivo: mantén 30–40 cm entre tus ojos y la pantalla para cuidar tu salud visual.',
                channelId: DISTANCE_CHANNEL_ID,
                priority: 'default',
              },
              trigger: { seconds: 0 },
            }).catch(() => {});
          }
        }
      };
      distanceRef.current = setInterval(distanceTick, 1000);
    }

    if (s.guidedBreaks && Notifications) {
      let guidedSeconds = 0;
      const guidedTick = () => {
        guidedSeconds += 1;
        if (guidedSeconds >= GUIDED_BREAK_INTERVAL_SEC) {
          guidedSeconds = 0;
          const nowSettings = settingsRef.current;
          if (!nowSettings.guidedBreaks) return;
          if (isInQuietHours()) return;
          Notifications.scheduleNotificationAsync({
            content: {
              title: '🧘 Blink — Pausa guiada',
              body: 'Llevas 30 min. Haz una pausa: mira lejos 20s, parpadea o prueba palming.',
              channelId: GUIDED_BREAK_CHANNEL_ID,
              priority: 'default',
            },
            trigger: { seconds: 0 },
          }).catch(() => {});
        }
      };
      guidedBreakRef.current = setInterval(guidedTick, 1000);
    }
  }, [stop, triggerBlink, isInQuietHours]);

  const start = useCallback(() => startSession(false), [startSession]);
  const startScheduled = useCallback(() => startSession(true), [startSession]);

  const checkSchedule = useCallback(() => {
    if (!settings.scheduleEnabled) return;
    if (isInQuietHours()) return;
    const inWindow = isWithinSchedule(
      settings.scheduleStart,
      settings.scheduleEnd,
      settings.scheduleDays
    );
    if (inWindow && !active) {
      startScheduled();
    } else if (!inWindow && scheduledMode) {
      stop(true);
    }
  }, [
    settings.scheduleEnabled,
    settings.scheduleStart,
    settings.scheduleEnd,
    settings.scheduleDays,
    active,
    scheduledMode,
    isInQuietHours,
    startScheduled,
    stop,
  ]);

  useEffect(() => {
    if (!Notifications) return;
    (async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;
        if (Platform.OS === 'android') {
          const { AndroidImportance, AndroidNotificationVisibility } = Notifications;
          await Notifications.setNotificationChannelAsync(BLINK_CHANNEL_ID, {
            name: 'Recordatorios Blink',
            importance: AndroidImportance?.MAX ?? 7,
            description: 'Recordatorios para parpadear',
            vibrationPattern: [0, 30],
            lockscreenVisibility: AndroidNotificationVisibility?.PUBLIC ?? 1,
          });
          await Notifications.setNotificationChannelAsync(DISTANCE_CHANNEL_ID, {
            name: 'Recordatorio de distancia',
            importance: AndroidImportance?.DEFAULT ?? 3,
            description: 'Te recuerda mantener 30–40 cm de distancia con la pantalla',
            lockscreenVisibility: AndroidNotificationVisibility?.PUBLIC ?? 1,
          });
          await Notifications.setNotificationChannelAsync(GUIDED_BREAK_CHANNEL_ID, {
            name: 'Pausas guiadas',
            importance: AndroidImportance?.DEFAULT ?? 3,
            description: 'Sugerencias de pausa cada 30 minutos',
            lockscreenVisibility: AndroidNotificationVisibility?.PUBLIC ?? 1,
          });
        }
      } catch (_) {}
    })();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        lastInteractionRef.current = Date.now();
        checkSchedule();
      }
      appState.current = state;
    });
    return () => sub.remove();
  }, [checkSchedule]);

  useEffect(() => {
    if (!settings.scheduleEnabled) return;
    checkSchedule();
    scheduleCheckRef.current = setInterval(checkSchedule, 60000);
    return () => {
      if (scheduleCheckRef.current) clearInterval(scheduleCheckRef.current);
    };
  }, [settings.scheduleEnabled, checkSchedule]);

  useEffect(() => () => stop(true), [stop]);

  return { active, remaining, blinkCount, start, stop: () => stop(true), recordInteraction, scheduledMode };
};
