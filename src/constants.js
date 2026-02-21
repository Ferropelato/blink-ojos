export const INTERVAL_OPTIONS = [
  { value: 3, label: '3 s (20/min)' },
  { value: 4, label: '4 s (15/min)' },
  { value: 30, label: '30 segundos' },
  { value: 45, label: '45 segundos' },
  { value: 60, label: '1 minuto' },
  { value: 90, label: '1.5 minutos' },
  { value: 120, label: '2 minutos' },
  { value: 300, label: '5 minutos' },
];

export const DURATION_OPTIONS = [
  { value: 30, label: '30 minutos' },
  { value: 60, label: '1 hora' },
  { value: 120, label: '2 horas' },
  { value: 240, label: '4 horas' },
  { value: 0, label: 'Hasta que pause' },
];

export const INACTIVITY_OPTIONS = [
  { value: 0, label: 'Desactivado' },
  { value: 5, label: '5 minutos' },
  { value: 10, label: '10 minutos' },
  { value: 15, label: '15 minutos' },
];

export const FLASH_DURATION_MS = 50;

export const FLASH_OPACITY_OPTIONS = [
  { value: 0.04, label: 'Muy sutil' },
  { value: 0.06, label: 'Sutil' },
  { value: 0.08, label: 'Normal' },
  { value: 0.12, label: 'Visible' },
  { value: 0.18, label: 'Intenso' },
  { value: 0.25, label: 'Muy intenso' },
];

export const STIMULUS_TYPE_OPTIONS = [
  { value: 'flash', label: 'Flash' },
  { value: 'vibration', label: 'Vibración' },
  { value: 'both', label: 'Ambos' },
];

export const STORAGE_KEYS = {
  INTERVAL: '@blink/interval',
  DURATION: '@blink/duration',
  INACTIVITY: '@blink/inactivity',
  RESPECT_DND: '@blink/respectDnd',
  SCHEDULE_ENABLED: '@blink/scheduleEnabled',
  SCHEDULE_START: '@blink/scheduleStart',
  SCHEDULE_END: '@blink/scheduleEnd',
  SCHEDULE_DAYS: '@blink/scheduleDays',
  QUIET_START: '@blink/quietStart',
  QUIET_END: '@blink/quietEnd',
  FLASH_OPACITY: '@blink/flashOpacity',
  STIMULUS_TYPE: '@blink/stimulusType',
  STATS_DATA: '@blink/statsData',
  ONBOARDING_DONE: '@blink/onboardingDone',
  SOUND_ENABLED: '@blink/soundEnabled',
  FONT_SCALE: '@blink/fontScale',
  DEVICE_PRESET: '@blink/devicePreset',
  PROXIMITY_PAUSE: '@blink/proximityPause',
  DISTANCE_REMINDER: '@blink/distanceReminder',
  RESPECT_SYSTEM_DND: '@blink/respectSystemDnd',
  THEME: '@blink/theme',
  LOCALE: '@blink/locale',
  BLINK_MONITOR_SESSIONS: '@blink/blinkMonitorSessions',
  GUIDED_BREAKS: '@blink/guidedBreaks',
  PRESET: '@blink/preset',
};

export const PRESET_OPTIONS = [
  { value: 'none', label: 'Personalizado' },
  { value: 'reading', label: 'Lectura', interval: 30, duration: 60 },
  { value: 'movie', label: 'Película', interval: 120, duration: 120 },
  { value: 'work', label: 'Trabajo', interval: 45, duration: 120 },
];

export const SCHEDULE_DAYS_OPTIONS = [
  { value: '1,2,3,4,5', label: 'Lun–Vie' },
  { value: '1,2,3,4,5,6', label: 'Lun–Sáb' },
  { value: '0,1,2,3,4,5,6', label: 'Todos' },
];

export const FONT_SCALE_OPTIONS = [
  { value: 1, label: 'Normal' },
  { value: 1.15, label: 'Grande' },
  { value: 1.3, label: 'Muy grande' },
];

export const DEVICE_PRESET_OPTIONS = [
  { value: 'auto', label: 'Automático' },
  { value: 'phone', label: 'Teléfono' },
  { value: 'tablet', label: 'Tablet' },
];

export const THEME_OPTIONS = [
  { value: 'dark', label: 'Oscuro' },
  { value: 'light', label: 'Claro' },
];

export const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${i.toString().padStart(2, '0')}:00`,
}));
