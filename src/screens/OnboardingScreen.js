import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
  { title: '👁️ Bienvenido a Blink', text: 'Ayuda a prevenir el ojo seco recordándote parpadear de forma consciente.' },
  { title: 'Recordatorios sutiles', text: 'Un micro-flash o vibración discreta cada cierto tiempo. No interrumpe tu trabajo, películas ni lectura.' },
  { title: 'Configura a tu gusto', text: 'Intervalo, duración, horarios programados y horario silencioso. Todo adaptable.' },
  { title: '¡Listo!', text: 'Pulsa "Iniciar sesión" cuando empieces a usar pantallas. Tus ojos te lo agradecerán.' },
];

export const OnboardingScreen = ({ onComplete }) => {
  const [slide, setSlide] = React.useState(0);
  const isLast = slide === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={[styles.slide, { width }]}>
          <Text style={styles.title}>{SLIDES[slide].title}</Text>
          <Text style={styles.text}>{SLIDES[slide].text}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === slide && styles.dotActive]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => (isLast ? onComplete() : setSlide(slide + 1))}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isLast ? 'Comenzar' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2a24',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#8ba89a',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 320,
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3d5a50',
  },
  dotActive: {
    backgroundColor: '#6b9b8a',
    width: 24,
  },
  button: {
    backgroundColor: '#3d7a65',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
