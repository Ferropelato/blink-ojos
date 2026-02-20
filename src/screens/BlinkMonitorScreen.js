import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useTranslation } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { getThemeColors } from '../utils/theme';
import { saveBlinkMonitorSession, loadBlinkMonitorSessions } from '../storage/blinkMonitorStorage';

let CameraView = null;
let useCameraPermissions = null;
try {
  const cam = require('expo-camera');
  CameraView = cam.CameraView;
  useCameraPermissions = cam.useCameraPermissions;
} catch (e) {
  CameraView = null;
  useCameraPermissions = null;
}

export default function BlinkMonitorScreen() {
  const { width } = useWindowDimensions();
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t, locale } = useTranslation();

  const camPerms = useCameraPermissions?.();
  const permission = camPerms?.[0] ?? { granted: false };
  const requestPermission = camPerms?.[1] ?? (() => {});
  const [monitoring, setMonitoring] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const [history, setHistory] = useState([]);
  const blinkTimestampsRef = useRef([]);

  const startMonitoring = useCallback(() => {
    setBlinkCount(0);
    blinkTimestampsRef.current = [];
    setSessionStart(Date.now());
    setMonitoring(true);
  }, []);

  const stopMonitoring = useCallback(async () => {
    if (!sessionStart || blinkTimestampsRef.current.length === 0) {
      setMonitoring(false);
      setSessionStart(null);
      return;
    }
    const durationSec = Math.round((Date.now() - sessionStart) / 1000);
    const session = {
      id: Date.now(),
      blinkCount: blinkCount,
      durationSec,
      timestamps: [...blinkTimestampsRef.current],
      date: new Date().toISOString(),
    };
    await saveBlinkMonitorSession(session);
    setHistory((h) => [session, ...h.slice(0, 9)]);
    setMonitoring(false);
    setSessionStart(null);
    setBlinkCount(0);
  }, [sessionStart, blinkCount]);

  const recordBlink = useCallback(() => {
    if (!monitoring) return;
    blinkTimestampsRef.current.push(Date.now());
    setBlinkCount((c) => c + 1);
  }, [monitoring]);

  React.useEffect(() => {
    loadBlinkMonitorSessions().then(setHistory);
  }, []);

  const isWeb = Platform.OS === 'web';
  const cameraAvailable = !!CameraView && !isWeb;

  const title = locale === 'es' ? 'Registro de parpadeos' : 'Blink log';
  const subtitle =
    locale === 'es'
      ? 'Toca el botón cada vez que parpadees. Registro privado y local.'
      : 'Tap the button each time you blink. Private and local record.';

  if (!cameraAvailable) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
        </View>
        <View style={[styles.fallback, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.fallbackText, { color: colors.textMuted }]}>
            {locale === 'es'
              ? 'La cámara no está disponible en este entorno (web o Expo Go). Usa la app en un dispositivo físico para el modo monitor con cámara.'
              : 'Camera is not available in this environment (web or Expo Go). Use the app on a physical device for camera monitor mode.'}
          </Text>
          <Text style={[styles.fallbackHint, { color: colors.textDim }]}>
            {locale === 'es'
              ? 'Mientras tanto, puedes usar el registro manual desde Inicio contando los recordatorios.'
              : 'Meanwhile, you can use the manual log from Home by counting reminders.'}
          </Text>
        </View>
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
        </View>
        <View style={[styles.fallback, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.fallbackText, { color: colors.textMuted }]}>
            {locale === 'es'
              ? 'Se necesita permiso de cámara para el modo monitor.'
              : 'Camera permission is needed for monitor mode.'}
          </Text>
          <TouchableOpacity
            style={[styles.permButton, { backgroundColor: colors.primary }]}
            onPress={requestPermission}
          >
            <Text style={styles.permButtonText}>
              {locale === 'es' ? 'Permitir cámara' : 'Allow camera'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
      </View>

      {monitoring ? (
        <View style={styles.cameraSection}>
          <CameraView style={styles.camera} facing="front" />
          <View style={[styles.overlay, { backgroundColor: colors.bg + '99' }]}>
            <View style={styles.stats}>
              <Text style={[styles.blinkCount, { color: colors.accent }]}>{blinkCount}</Text>
              <Text style={[styles.blinkLabel, { color: colors.textMuted }]}>
                {locale === 'es' ? 'parpadeos' : 'blinks'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.blinkButton, { backgroundColor: colors.primary }]}
              onPress={recordBlink}
              activeOpacity={0.8}
            >
              <Text style={styles.blinkButtonText}>
                {locale === 'es' ? '👁️ Parpadeé' : '👁️ I blinked'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stopButton, { borderColor: colors.primary }]}
              onPress={stopMonitoring}
            >
              <Text style={[styles.stopButtonText, { color: colors.primary }]}>
                {locale === 'es' ? 'Finalizar sesión' : 'End session'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={startMonitoring}
          >
            <Text style={styles.startButtonText}>
              {locale === 'es' ? 'Iniciar registro' : 'Start logging'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {history.length > 0 && (
        <ScrollView style={styles.history} contentContainerStyle={styles.historyContent}>
          <Text style={[styles.historyTitle, { color: colors.text }]}>
            {locale === 'es' ? 'Sesiones recientes' : 'Recent sessions'}
          </Text>
          {history.slice(0, 5).map((s) => (
            <View key={s.id} style={[styles.historyItem, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.historyBlink, { color: colors.accent }]}>{s.blinkCount}</Text>
              <Text style={[styles.historyMeta, { color: colors.textMuted }]}>
                {s.durationSec}s · {new Date(s.date).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4, lineHeight: 20 },
  fallback: {
    margin: 24,
    padding: 24,
    borderRadius: 16,
  },
  fallbackText: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  fallbackHint: { fontSize: 13, lineHeight: 18 },
  permButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  permButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cameraSection: { flex: 1, position: 'relative' },
  camera: { flex: 1, minHeight: 300 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  stats: { alignItems: 'center', marginBottom: 24 },
  blinkCount: { fontSize: 48, fontWeight: '700' },
  blinkLabel: { fontSize: 14, marginTop: 4 },
  blinkButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  blinkButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  stopButton: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
  },
  stopButtonText: { fontSize: 14, fontWeight: '600' },
  controls: { padding: 24, alignItems: 'center' },
  startButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  history: { maxHeight: 180 },
  historyContent: { padding: 24, paddingTop: 8 },
  historyTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  historyBlink: { fontSize: 20, fontWeight: '700', marginRight: 12 },
  historyMeta: { fontSize: 13 },
});
