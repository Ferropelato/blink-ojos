import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';
import { useSession } from '../hooks/useSession';
import { BlinkOverlay } from '../components/BlinkOverlay';
import { recordSession } from '../storage/statsStorage';
import { useStats } from '../context/StatsContext';
import { getThemeColors } from '../utils/theme';
import { useTranslation } from '../i18n';

// Imagen de fondo relajante: paisaje natural suave (horizonte/cielo)
// Usamos un gradiente simulado con colores que evocan naturaleza y descanso visual
const EXERCISE_BG_COLORS = {
  dark: ['#1a2e28', '#2d4a3e', '#1a3d2e'],
  light: ['#e8f0ec', '#d4e6de', '#c5ddd2'],
};

const formatTime = (seconds) => {
  if (seconds >= Number.MAX_SAFE_INTEGER / 2) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function BlinkExerciseScreen() {
  const navigation = useNavigation();
  const { settings } = useSettings();
  const { refresh } = useStats();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t, locale } = useTranslation();
  const [flashVisible, setFlashVisible] = useState(false);

  const onBlink = useCallback(() => setFlashVisible(true), []);
  const onFlashComplete = useCallback(() => setFlashVisible(false), []);

  const onSessionEnd = useCallback(
    async (blinkCount, durationSec) => {
      await recordSession(blinkCount, durationSec);
      refresh();
    },
    [refresh]
  );

  // Config específica para ejercicio: intervalo corto (4s), duración 2 min, solo flash
  const exerciseSettings = {
    ...settings,
    interval: 4,
    duration: 2,
    stimulusType: 'flash',
    inactivity: 0,
    proximityPause: false,
  };

  const { active, remaining, blinkCount, start, stop } = useSession(
    exerciseSettings,
    onBlink,
    { onSessionEnd }
  );

  const bgColors = EXERCISE_BG_COLORS[theme] || EXERCISE_BG_COLORS.dark;

  return (
    <View style={[styles.container, { backgroundColor: bgColors[0] }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <BlinkOverlay
        visible={flashVisible}
        onComplete={onFlashComplete}
        flashOpacity={Math.min((settings?.flashOpacity || 0.08) * 1.2, 0.25)}
        theme={theme}
      />

      {/* Fondo con gradiente simulado - paisaje relajante */}
      <View style={[styles.bgLayer, { backgroundColor: bgColors[1] }]} />
      <View style={[styles.bgLayerBottom, { backgroundColor: bgColors[2] }]} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={[styles.backText, { color: colors.textMuted }]}>← {t.exerciseSession.back}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{t.exerciseSession.title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t.exerciseSession.subtitle}</Text>

        {!active ? (
          <>
            <Text style={[styles.instruction, { color: colors.textMuted }]}>
              {t.exerciseSession.instruction}
            </Text>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={start}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>{t.exerciseSession.start}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.sessionInfo}>
            <View style={[styles.statBox, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{blinkCount}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {t.exerciseSession.blinks}
              </Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>{formatTime(remaining)}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {t.exerciseSession.remaining}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.stopButton, { backgroundColor: colors.primary + '40', borderColor: colors.primary }]}
              onPress={stop}
              activeOpacity={0.8}
            >
              <Text style={[styles.stopButtonText, { color: colors.primary }]}>
                {t.exerciseSession.stop}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    opacity: 0.6,
  },
  bgLayerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    opacity: 0.4,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  instruction: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    fontStyle: 'italic',
  },
  startButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sessionInfo: {
    alignItems: 'center',
    gap: 20,
  },
  statBox: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 140,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  stopButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 16,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
