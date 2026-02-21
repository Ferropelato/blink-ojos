import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { getThemeColors } from '../utils/theme';
import { EXERCISES, YOGA_EXERCISES } from '../data/exercises';

const ICONS = {
  '20-20-20': '⏱️',
  parpadeo: '👁️',
  palming: '🤲',
  figura8: '8️⃣',
  enfocar: '🔭',
  masaje: '✋',
  direccionales: '↔️',
  circulos: '🔄',
};

export default function ExercisesScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t, locale } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { maxWidth: isTablet ? 600 : '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t.exercises.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t.exercises.subtitle}</Text>
          <View style={[styles.distanceTip, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.distanceTipText, { color: colors.textMuted }]}>
              📏 {t.exercises.distanceTip}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.exercises.basicTitle}</Text>
        {EXERCISES.map((exercise) => {
          const title = exercise.title[locale] || exercise.title.es;
          const description = exercise.description[locale] || exercise.description.es;
          const duration = exercise.duration[locale] || exercise.duration.es;
          const steps = exercise.steps[locale] || exercise.steps.es;
          const isExpanded = expandedId === exercise.id;
          const icon = ICONS[exercise.icon] || '👁️';

          return (
            <View key={exercise.id} style={[styles.card, { backgroundColor: colors.cardBg }]}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(exercise.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconBox, { backgroundColor: colors.primary + '30' }]}>
                  <Text style={styles.icon}>{icon}</Text>
                </View>
                <View style={styles.cardHeaderText}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                  <Text style={[styles.cardDuration, { color: colors.textDim }]}>{duration}</Text>
                </View>
                <Text style={[styles.expandIcon, { color: colors.accent }]}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={[styles.cardBody, { borderTopColor: colors.optionBg }]}>
                  <Text style={[styles.cardDescription, { color: colors.textMuted }]}>
                    {description}
                  </Text>
                  <Text style={[styles.stepsTitle, { color: colors.text }]}>{t.exercises.steps}</Text>
                  {steps.map((step, i) => (
                    <Text key={i} style={[styles.step, { color: colors.textMuted }]}>
                      {step}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <View style={[styles.yogaSection, { marginTop: 32 }]}>
          <Text style={[styles.yogaTitle, { color: colors.text }]}>{t.exercises.yogaTitle}</Text>
          <Text style={[styles.yogaSubtitle, { color: colors.textMuted }]}>{t.exercises.yogaSubtitle}</Text>
        </View>

        {YOGA_EXERCISES.map((exercise) => {
          const title = exercise.title[locale] || exercise.title.es;
          const description = exercise.description[locale] || exercise.description.es;
          const duration = exercise.duration[locale] || exercise.duration.es;
          const benefits = exercise.benefits?.[locale] || exercise.benefits?.es;
          const steps = exercise.steps[locale] || exercise.steps.es;
          const isExpanded = expandedId === exercise.id;
          const icon = ICONS[exercise.icon] || '🧘';

          return (
            <View key={exercise.id} style={[styles.card, { backgroundColor: colors.cardBg }]}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(exercise.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconBox, { backgroundColor: colors.primary + '30' }]}>
                  <Text style={styles.icon}>{icon}</Text>
                </View>
                <View style={styles.cardHeaderText}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                  <Text style={[styles.cardDuration, { color: colors.textDim }]}>{duration}</Text>
                </View>
                <Text style={[styles.expandIcon, { color: colors.accent }]}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={[styles.cardBody, { borderTopColor: colors.optionBg }]}>
                  <Text style={[styles.cardDescription, { color: colors.textMuted }]}>{description}</Text>
                  {benefits && (
                    <>
                      <Text style={[styles.benefitsLabel, { color: colors.accent }]}>Beneficios:</Text>
                      <Text style={[styles.benefitsText, { color: colors.textMuted }]}>{benefits}</Text>
                    </>
                  )}
                  <Text style={[styles.stepsTitle, { color: colors.text }]}>{t.exercises.steps}</Text>
                  {steps.map((step, i) => (
                    <Text key={i} style={[styles.step, { color: colors.textMuted }]}>{step}</Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <Text style={[styles.footer, { color: colors.textDim }]}>{t.exercises.footer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  distanceTip: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
  },
  distanceTipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  yogaSection: {
    marginBottom: 16,
  },
  yogaTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  yogaSubtitle: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  benefitsLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDuration: {
    fontSize: 12,
    marginTop: 2,
  },
  expandIcon: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  step: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});
