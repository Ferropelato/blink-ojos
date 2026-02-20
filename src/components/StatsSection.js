import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform, Share } from 'react-native';
import { useStats } from '../context/StatsContext';
import { useTheme } from '../context/ThemeContext';
import { resetStats, getStatsForExport } from '../storage/statsStorage';

export const StatsSection = ({ t }) => {
  const { summary, refresh, statsData } = useStats();
  const colors = useTheme();
  const stats = t?.stats || { title: 'Estadísticas', export: 'Exportar', reset: 'Resetear', remindersToday: 'Recordatorios hoy', sessionsToday: 'Sesiones hoy', remindersWeek: 'Recordatorios esta semana', sessionsTotal: 'Sesiones total' };

  const handleExport = async () => {
    const csv = getStatsForExport(statsData);
    const text = `Blink - Estadísticas\n\n${summary.blinksToday} recordatorios hoy\n${summary.sessionsToday} sesiones hoy\n${summary.blinksThisWeek} recordatorios esta semana\n${summary.totalSessions} sesiones total\n\n---\n${csv}`;
    if (Platform.OS === 'web') {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert('Copiado al portapapeles');
      } else {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blink-stats-${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
      }
    } else {
      try {
        await Share.share({ message: text, title: 'Blink - Estadísticas' });
      } catch (e) {
        if (e.message?.includes('cancel')) return;
        Alert.alert('Error', 'No se pudo compartir');
      }
    }
  };

  const handleReset = () => {
    const doReset = async () => {
      await resetStats();
      refresh();
    };
    if (Platform.OS === 'web') {
      if (window.confirm('¿Borrar todas las estadísticas?')) doReset();
    } else {
      Alert.alert(
        'Resetear estadísticas',
        '¿Borrar todas las estadísticas? Esta acción no se puede deshacer.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Borrar', style: 'destructive', onPress: doReset },
        ]
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{stats.title}</Text>
        <View style={styles.btns}>
          <TouchableOpacity style={[styles.exportBtn, { backgroundColor: colors.accent + '4D' }]} onPress={handleExport}>
            <Text style={[styles.exportBtnText, { color: colors.accent }]}>{stats.export}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.primaryActive + '4D' }]} onPress={handleReset}>
            <Text style={[styles.resetBtnText, { color: colors.primaryActive }]}>{stats.reset}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: colors.bg }]}>
          <Text style={[styles.value, { color: colors.accent }]}>{summary.blinksToday}</Text>
          <Text style={[styles.label, { color: colors.textMuted }]}>{stats.remindersToday}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.bg }]}>
          <Text style={[styles.value, { color: colors.accent }]}>{summary.sessionsToday}</Text>
          <Text style={[styles.label, { color: colors.textMuted }]}>{stats.sessionsToday}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.bg }]}>
          <Text style={[styles.value, { color: colors.accent }]}>{summary.blinksThisWeek}</Text>
          <Text style={[styles.label, { color: colors.textMuted }]}>{stats.remindersWeek}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.bg }]}>
          <Text style={[styles.value, { color: colors.accent }]}>{summary.totalSessions}</Text>
          <Text style={[styles.label, { color: colors.textMuted }]}>{stats.sessionsTotal}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: '#243830',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  btns: {
    flexDirection: 'row',
    gap: 8,
  },
  exportBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(107, 155, 138, 0.3)',
  },
  exportBtnText: {
    color: '#6b9b8a',
    fontSize: 12,
    fontWeight: '600',
  },
  resetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(196, 92, 74, 0.3)',
  },
  resetBtnText: {
    color: '#c45c4a',
    fontSize: 12,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a2a24',
    borderRadius: 12,
    padding: 16,
  },
  value: {
    color: '#6b9b8a',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    color: '#8ba89a',
    fontSize: 12,
  },
});
