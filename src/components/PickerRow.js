import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const isSelected = (value, optValue) =>
  typeof value === 'number' && typeof optValue === 'number'
    ? Math.abs(value - optValue) < 0.001
    : value === optValue;

export const PickerRow = ({ label, value, options, onSelect, fontScale = 1 }) => {
  const colors = useTheme();
  const optionBg = colors.optionBg || '#2d3d36';
  const optionActiveBg = colors.optionActiveBg || colors.primary;
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { fontSize: 14 * fontScale, color: colors.textMuted }]}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
        <View style={styles.options}>
          {options.map((opt) => (
            <TouchableOpacity
              key={String(opt.value)}
              style={[
                styles.option,
                { backgroundColor: optionBg },
                isSelected(value, opt.value) && { backgroundColor: optionActiveBg },
              ]}
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  { fontSize: 14 * fontScale, color: colors.optionText || colors.textMuted },
                  isSelected(value, opt.value) && { color: '#fff', fontWeight: '600' },
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  optionsScroll: {
    marginHorizontal: -4,
  },
  options: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  optionActive: {
    backgroundColor: '#2d5a4a',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
