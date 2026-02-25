import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { PickerRow } from './PickerRow';
import { HOUR_OPTIONS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { isQuietHours } from '../utils/schedule';

export const QuietHoursSection = ({ settings, setSettings, recordInteraction, fontScale = 1, t }) => {
  const colors = useTheme();
  const quiet = t?.quiet || { title: 'Horario silencioso', hint: 'No habrá recordatorios en este horario.', from: 'Inicio (ej. 22:00)', to: 'Fin (ej. 07:00)', activeNow: 'Activo ahora: no hay flash ni recordatorios.' };
  const inQuietHours = settings.respectDnd && isQuietHours(settings.quietStart, settings.quietEnd);
  return (
  <View style={styles.section}>
    <View style={styles.switchRow}>
      <Text style={[styles.sectionLabel, { fontSize: 14 * fontScale, color: colors.textMuted }]}>{quiet.title}</Text>
      <Switch
        value={settings.respectDnd}
        onValueChange={(v) => setSettings({ respectDnd: v })}
        trackColor={{ false: '#ccc', true: colors.accent }}
        thumbColor="#fff"
      />
    </View>
    {settings.respectDnd && (
      <>
        {inQuietHours && <Text style={[styles.activeNow, { color: colors.accent }]}>{quiet.activeNow}</Text>}
        <Text style={[styles.hint, { color: colors.textDim }]}>{quiet.hint}</Text>
        <PickerRow
          label={quiet.from}
          value={settings.quietStart}
          options={HOUR_OPTIONS}
          fontScale={fontScale}
          onSelect={(v) => {
            recordInteraction();
            setSettings({ quietStart: v });
          }}
        />
        <PickerRow
          label={quiet.to}
          value={settings.quietEnd}
          options={HOUR_OPTIONS}
          fontScale={fontScale}
          onSelect={(v) => {
            recordInteraction();
            setSettings({ quietEnd: v });
          }}
        />
      </>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hint: {
    color: '#6b7a72',
    fontSize: 12,
    marginBottom: 8,
  },
  activeNow: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
});
