import React from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { useTranslation } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { getThemeColors } from '../utils/theme';

export default function BenefitsScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t, locale } = useTranslation();

  const benefits = locale === 'es' ? BENEFITS_ES : BENEFITS_EN;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { maxWidth: isTablet ? 600 : '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t.benefits?.title || 'Beneficios'}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {t.benefits?.subtitle || 'Cómo Blink contribuye a la salud de tus ojos.'}
          </Text>
        </View>

        {benefits.map((item, i) => (
          <View key={i} style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.icon, { color: colors.primary }]}>{item.icon}</Text>
            <Text style={[styles.benefitTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.benefitDesc, { color: colors.textMuted }]}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const BENEFITS_ES = [
  { icon: '🫧', title: 'Activa las glándulas de Meibomio', description: 'El parpadeo regular estimula la secreción de la capa lipídica que evita la evaporación de la lágrima.' },
  { icon: '💧', title: 'Mejora la capa lipídica', description: 'Una película lagrimal más estable protege la superficie ocular y reduce la sequedad.' },
  { icon: '🌡️', title: 'Reduce la evaporación lagrimal', description: 'Parpadear con frecuencia mantiene la humedad en la superficie del ojo.' },
  { icon: '👁️', title: 'Previene el síndrome de ojo seco', description: 'Mantener 15–20 parpadeos por minuto es la recomendación para prevenir sequedad e irritación.' },
  { icon: '😌', title: 'Disminuye la tensión visual', description: 'Los recordatorios ayudan a relajar los músculos oculares durante el uso prolongado de pantallas.' },
  { icon: '⚡', title: 'Previene la fatiga digital', description: 'Reduce el cansancio ocular asociado al uso de dispositivos electrónicos.' },
  { icon: '🔬', title: 'Mejora la lubricación', description: 'Distribuye la lágrima de forma uniforme sobre la córnea y la conjuntiva.' },
  { icon: '🧘', title: 'Regula el sistema nervioso', description: 'Pausas conscientes de parpadeo favorecen la relajación general.' },
];

const BENEFITS_EN = [
  { icon: '🫧', title: 'Activates Meibomian glands', description: 'Regular blinking stimulates secretion of the lipid layer that prevents tear evaporation.' },
  { icon: '💧', title: 'Improves lipid layer', description: 'A more stable tear film protects the ocular surface and reduces dryness.' },
  { icon: '🌡️', title: 'Reduces tear evaporation', description: 'Blinking frequently maintains moisture on the eye surface.' },
  { icon: '👁️', title: 'Prevents dry eye syndrome', description: 'Maintaining 15–20 blinks per minute is recommended to prevent dryness and irritation.' },
  { icon: '😌', title: 'Reduces eye strain', description: 'Reminders help relax eye muscles during prolonged screen use.' },
  { icon: '⚡', title: 'Prevents digital fatigue', description: 'Reduces eye fatigue associated with electronic device use.' },
  { icon: '🔬', title: 'Improves lubrication', description: 'Distributes tears evenly over the cornea and conjunctiva.' },
  { icon: '🧘', title: 'Regulates nervous system', description: 'Conscious blinking pauses promote overall relaxation.' },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    alignSelf: 'center',
    width: '100%',
  },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, marginTop: 4, lineHeight: 22 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  icon: { fontSize: 28, marginBottom: 8 },
  benefitTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  benefitDesc: { fontSize: 14, lineHeight: 22 },
});
