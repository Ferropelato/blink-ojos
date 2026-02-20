import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { PickerRow } from './PickerRow';
import { SCHEDULE_DAYS_OPTIONS, HOUR_OPTIONS } from '../constants';
import { useTheme } from '../context/ThemeContext';

export const ScheduleSection = ({ settings, setSettings, recordInteraction, fontScale = 1, t }) => {
  const colors = useTheme();
  const schedule = t?.schedule || { title: 'Modo programado', days: 'Días', from: 'Desde', to: 'Hasta' };
  return (
  <View style={styles.section}>
    <View style={styles.switchRow}>
      <Text style={[styles.sectionLabel, { fontSize: 14 * fontScale, color: colors.textMuted }]}>{schedule.title}</Text>
      <Switch
        value={settings.scheduleEnabled}
        onValueChange={(v) => setSettings({ scheduleEnabled: v })}
        trackColor={{ false: '#ccc', true: colors.accent }}
        thumbColor="#fff"
      />
    </View>
    {settings.scheduleEnabled && (
      <>
        <PickerRow
          label={schedule.days}
          value={settings.scheduleDays}
          options={SCHEDULE_DAYS_OPTIONS}
          fontScale={fontScale}
          onSelect={(v) => {
            recordInteraction();
            setSettings({ scheduleDays: v });
          }}
        />
        <PickerRow
          label={schedule.from}
          value={settings.scheduleStart}
          options={HOUR_OPTIONS}
          fontScale={fontScale}
          onSelect={(v) => {
            recordInteraction();
            setSettings({ scheduleStart: v });
          }}
        />
        <PickerRow
          label={schedule.to}
          value={settings.scheduleEnd}
          options={HOUR_OPTIONS}
          fontScale={fontScale}
          onSelect={(v) => {
            recordInteraction();
            setSettings({ scheduleEnd: v });
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
});
