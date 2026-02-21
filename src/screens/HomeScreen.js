import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSettings } from '../context/SettingsContext';
import { useStats } from '../context/StatsContext';
import { useOnboarding } from '../context/OnboardingContext';
import { useSession } from '../hooks/useSession';
import { useProximity } from '../hooks/useProximity';
import { useProximityDistance } from '../hooks/useProximityDistance';
import { recordSession } from '../storage/statsStorage';
import { BlinkOverlay } from '../components/BlinkOverlay';
import { PickerRow } from '../components/PickerRow';
import {
  INTERVAL_OPTIONS,
  DURATION_OPTIONS,
  INACTIVITY_OPTIONS,
  FLASH_OPACITY_OPTIONS,
  STIMULUS_TYPE_OPTIONS,
  FONT_SCALE_OPTIONS,
  DEVICE_PRESET_OPTIONS,
  THEME_OPTIONS,
  PRESET_OPTIONS,
} from '../constants';
import { getThemeColors } from '../utils/theme';
import { useTranslation, LOCALE_OPTIONS } from '../i18n';
import { ScheduleSection } from '../components/ScheduleSection';
import { QuietHoursSection } from '../components/QuietHoursSection';
import { StatsSection } from '../components/StatsSection';

const formatTime = (seconds) => {
  if (seconds >= Number.MAX_SAFE_INTEGER / 2) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function HomeScreen() {
  const { settings, setSettings, loaded, savedFeedback } = useSettings();
  const { refresh } = useStats();
  const { reset: resetOnboarding } = useOnboarding();
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const fontScale = settings.fontScale || 1;
  const theme = settings.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t } = useTranslation();
  const [flashVisible, setFlashVisible] = useState(false);

  const onBlink = useCallback(() => {
    setFlashVisible(true);
  }, []);

  const onFlashComplete = useCallback(() => {
    setFlashVisible(false);
  }, []);

  const onSessionEnd = useCallback(async (blinkCount, durationSec) => {
    await recordSession(blinkCount, durationSec);
    refresh();
  }, [refresh]);

  const isFaceDown = useProximity(settings.proximityPause);
  useProximityDistance(settings.distanceReminder);
  const { active, remaining, blinkCount, start, stop, recordInteraction, scheduledMode } = useSession(
    settings,
    onBlink,
    { onSessionEnd, externalPause: isFaceDown }
  );

  if (!loaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.loading, { color: colors.text }]}>{t.app.loading}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <BlinkOverlay
        visible={flashVisible}
        onComplete={onFlashComplete}
        flashOpacity={settings.flashOpacity}
        theme={theme}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScrollBeginDrag={recordInteraction}
        onTouchStart={recordInteraction}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t.app.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t.app.subtitle}</Text>
        </View>

        <View style={styles.main}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: active ? colors.primaryActive : colors.primary },
            ]}
            onPress={() => {
              recordInteraction();
              active ? stop() : start();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {active ? (scheduledMode ? t.session.stopScheduled : t.session.stop) : t.session.start}
            </Text>
          </TouchableOpacity>

          {active && (
            <View style={styles.timer}>
              {scheduledMode && (
                <Text style={[styles.timerBadge, { color: colors.accent }]}>{t.session.scheduledBadge}</Text>
              )}
              <Text style={[styles.timerLabel, { color: colors.textMuted }]}>{t.session.remindersThisSession}</Text>
              <Text style={[styles.timerValue, { color: colors.text }]}>{blinkCount}</Text>
              <Text style={[styles.timerLabel, { color: colors.textMuted }]}>{t.session.timeRemaining}</Text>
              <Text style={[styles.timerValue, { color: colors.text }]}>{formatTime(remaining)}</Text>
            </View>
          )}
        </View>

        <StatsSection t={t} />

        <View style={[styles.config, { backgroundColor: colors.cardBg }]}>
          <View style={styles.configHeader}>
            <Text style={[styles.configTitle, { fontSize: 18 * fontScale, color: colors.text }]}>{t.config.title}</Text>
            {savedFeedback && <Text style={[styles.savedBadge, { color: colors.accent }]}>{t.config.saved}</Text>}
          </View>

          <PickerRow
            label={t.config.preset}
            value={settings.preset || 'none'}
            options={PRESET_OPTIONS.map((p) => ({ value: p.value, label: p.label }))}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              const preset = PRESET_OPTIONS.find((p) => p.value === v);
              const updates = { preset: v };
              if (preset?.interval != null) updates.interval = preset.interval;
              if (preset?.duration != null) updates.duration = preset.duration;
              setSettings(updates);
            }}
          />

          <PickerRow
            label={t.config.interval}
            value={settings.interval}
            options={INTERVAL_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ interval: v });
            }}
          />

          <PickerRow
            label={t.config.duration}
            value={settings.duration}
            options={DURATION_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ duration: v });
            }}
          />

          <PickerRow
            label={t.config.inactivity}
            value={settings.inactivity}
            options={INACTIVITY_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ inactivity: v });
            }}
          />

          <PickerRow
            label={t.config.proximityPause}
            value={settings.proximityPause}
            options={[{ value: false, label: t.yesNo.no }, { value: true, label: t.yesNo.yes }]}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ proximityPause: v });
            }}
          />

          <PickerRow
            label={t.config.guidedBreaks}
            value={settings.guidedBreaks}
            options={[{ value: false, label: t.yesNo.no }, { value: true, label: t.yesNo.yes }]}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ guidedBreaks: v });
            }}
          />

          <PickerRow
            label={t.config.distanceReminder}
            value={settings.distanceReminder}
            options={[{ value: false, label: t.yesNo.no }, { value: true, label: t.yesNo.yes }]}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ distanceReminder: v });
            }}
          />

          <PickerRow
            label={t.config.stimulusType}
            value={settings.stimulusType}
            options={STIMULUS_TYPE_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ stimulusType: v });
            }}
          />

          <PickerRow
            label={t.config.flashOpacity}
            value={settings.flashOpacity}
            options={FLASH_OPACITY_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ flashOpacity: v });
            }}
          />

          <ScheduleSection
            t={t}
            settings={settings}
            setSettings={setSettings}
            recordInteraction={recordInteraction}
            fontScale={fontScale}
          />

          <QuietHoursSection
            t={t}
            settings={settings}
            setSettings={setSettings}
            recordInteraction={recordInteraction}
            fontScale={fontScale}
          />

          <PickerRow
            label={t.config.sound}
            value={settings.soundEnabled}
            options={[{ value: false, label: t.yesNo.no }, { value: true, label: t.yesNo.yes }]}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ soundEnabled: v });
            }}
          />

          <PickerRow
            label={t.config.devicePreset}
            value={settings.devicePreset}
            options={DEVICE_PRESET_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ devicePreset: v });
            }}
          />

          <PickerRow
            label={t.config.fontScale}
            value={settings.fontScale}
            options={FONT_SCALE_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ fontScale: v });
            }}
          />

          <PickerRow
            label={t.config.theme}
            value={settings.theme}
            options={THEME_OPTIONS.map((o) => ({ ...o, label: t.theme[o.value] }))}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ theme: v });
            }}
          />

          <PickerRow
            label={t.config.locale}
            value={settings.locale}
            options={LOCALE_OPTIONS}
            fontScale={fontScale}
            onSelect={(v) => {
              recordInteraction();
              setSettings({ locale: v });
            }}
          />

          <TouchableOpacity
            style={styles.tutorialButton}
            onPress={() => {
              recordInteraction();
              resetOnboarding();
            }}
          >
            <Text style={[styles.tutorialButtonText, { fontSize: 14 * fontScale, color: colors.textMuted }]}>
              {t.config.tutorial}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.footer, { color: colors.textDim }]}>
          {t.app.footer}
        </Text>
        <Text style={[styles.disclaimer, { color: colors.textDim }]}>
          {t.app.disclaimer}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2a24',
  },
  loading: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#8ba89a',
    marginTop: 4,
  },
  main: {
    alignItems: 'center',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#3d7a65',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryButtonActive: {
    backgroundColor: '#c45c4a',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  timer: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerBadge: {
    color: '#6b9b8a',
    fontSize: 12,
    marginBottom: 4,
  },
  timerLabel: {
    color: '#8ba89a',
    fontSize: 14,
    marginBottom: 4,
  },
  timerValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  config: {
    backgroundColor: '#243830',
    borderRadius: 16,
    padding: 20,
  },
  configHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  savedBadge: {
    color: '#6b9b8a',
    fontSize: 12,
    fontWeight: '600',
  },
  configTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tutorialButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tutorialButtonText: {
    color: '#8ba89a',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  switchLabel: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
  footer: {
    color: '#6b7a72',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
  },
  disclaimer: {
    color: '#6b7a72',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    paddingHorizontal: 16,
  },
});
