// Ejercicios para la salud visual

// Yoga para ojos: ejercicios con beneficios detallados
export const YOGA_EXERCISES = [
  {
    id: 'y1',
    icon: 'palming',
    title: { es: 'Palming (relajación profunda)', en: 'Palming (deep relaxation)' },
    duration: { es: '2–3 minutos', en: '2–3 minutes' },
    description: {
      es: 'Cubrir los ojos con las palmas cálidas promueve relajación profunda y reduce la tensión ocular.',
      en: 'Covering eyes with warm palms promotes deep relaxation and reduces eye tension.',
    },
    benefits: {
      es: 'Relajación muscular, disminución de tensión visual, regulación del sistema nervioso.',
      en: 'Muscle relaxation, reduced eye strain, nervous system regulation.',
    },
    steps: {
      es: [
        '1. Frota las palmas hasta calentarlas bien',
        '2. Cierra los ojos suavemente',
        '3. Coloca las palmas ahuecadas sobre los párpados sin presionar',
        '4. Respira profundo durante 2–3 minutos',
        '5. Retira las manos lentamente y abre los ojos',
      ],
      en: [
        '1. Rub your palms until warm',
        '2. Close your eyes gently',
        '3. Place cupped palms over eyelids without pressing',
        '4. Breathe deeply for 2–3 minutes',
        '5. Remove hands slowly and open eyes',
      ],
    },
  },
  {
    id: 'y2',
    icon: 'figura8',
    title: { es: 'Figura 8 con la mirada', en: 'Figure 8 with gaze' },
    duration: { es: '1–2 minutos', en: '1–2 minutes' },
    description: {
      es: 'Seguir un 8 horizontal con la mirada ejercita los músculos extraoculares.',
      en: 'Following a horizontal 8 with your gaze exercises extraocular muscles.',
    },
    benefits: {
      es: 'Coordinación ocular, flexibilidad del enfoque, prevención de fatiga digital.',
      en: 'Eye coordination, focus flexibility, digital fatigue prevention.',
    },
    steps: {
      es: [
        '1. Imagina un 8 horizontal acostado frente a ti',
        '2. Sigue el contorno con los ojos, sin mover la cabeza',
        '3. Haz 5 veces en un sentido',
        '4. Luego 5 veces en el otro',
        '5. Mantén un ritmo lento y fluido',
      ],
      en: [
        '1. Imagine a horizontal figure 8 in front of you',
        '2. Follow the outline with your eyes, head still',
        '3. Do 5 times in one direction',
        '4. Then 5 times in the other',
        '5. Keep a slow, fluid rhythm',
      ],
    },
  },
  {
    id: 'y3',
    icon: 'direccionales',
    title: { es: 'Movimientos direccionales', en: 'Directional movements' },
    duration: { es: '1 minuto', en: '1 minute' },
    description: {
      es: 'Mover los ojos en direcciones cardinales fortalece la musculatura ocular.',
      en: 'Moving eyes in cardinal directions strengthens eye muscles.',
    },
    benefits: {
      es: 'Coordinación, estimulación de glándulas de Meibomio, reducción de evaporación lagrimal.',
      en: 'Coordination, Meibomian gland stimulation, reduced tear evaporation.',
    },
    steps: {
      es: [
        '1. Mantén la cabeza quieta',
        '2. Mira arriba 3 segundos, luego abajo 3 segundos',
        '3. Mira a la derecha 3 segundos, luego a la izquierda',
        '4. Repite 3–4 veces',
        '5. Haz movimientos suaves, sin forzar',
      ],
      en: [
        '1. Keep head still',
        '2. Look up 3 seconds, then down 3 seconds',
        '3. Look right 3 seconds, then left',
        '4. Repeat 3–4 times',
        '5. Make smooth movements, do not strain',
      ],
    },
  },
  {
    id: 'y4',
    icon: 'enfocar',
    title: { es: 'Enfoque cercano-lejano', en: 'Near-far focus' },
    duration: { es: '1–2 minutos', en: '1–2 minutes' },
    description: {
      es: 'Alternar entre objeto cercano y lejano entrena acomodación y convergencia.',
      en: 'Alternating between near and far objects trains accommodation and convergence.',
    },
    benefits: {
      es: 'Acomodación, convergencia, prevención de fatiga por enfoque prolongado.',
      en: 'Accommodation, convergence, prevention of prolonged focus fatigue.',
    },
    steps: {
      es: [
        '1. Mantén el pulgar a 25–30 cm de la nariz',
        '2. Mira el pulgar 5 segundos',
        '3. Cambia la mirada a algo lejano (6 m) 5 segundos',
        '4. Alterna 10 veces',
        '5. Hazlo sin mover la cabeza',
      ],
      en: [
        '1. Hold thumb 25–30 cm from nose',
        '2. Look at thumb for 5 seconds',
        '3. Shift gaze to something far (6 m) for 5 seconds',
        '4. Alternate 10 times',
        '5. Do it without moving your head',
      ],
    },
  },
  {
    id: 'y5',
    icon: 'circulos',
    title: { es: 'Círculos oculares', en: 'Eye circles' },
    duration: { es: '1 minuto', en: '1 minute' },
    description: {
      es: 'Girar los ojos en círculos suaves mejora la movilidad y lubricación.',
      en: 'Rotating eyes in gentle circles improves mobility and lubrication.',
    },
    benefits: {
      es: 'Mejora la lubricación, estimulación de glándulas de Meibomio, relajación muscular.',
      en: 'Improved lubrication, Meibomian gland stimulation, muscle relaxation.',
    },
    steps: {
      es: [
        '1. Cierra los ojos o mantén mirada suave',
        '2. Gira los ojos en círculos lentos en sentido horario',
        '3. Haz 5 círculos',
        '4. Luego 5 en sentido antihorario',
        '5. Mantén la cabeza quieta',
      ],
      en: [
        '1. Close eyes or keep gaze soft',
        '2. Rotate eyes in slow circles clockwise',
        '3. Do 5 circles',
        '4. Then 5 counterclockwise',
        '5. Keep head still',
      ],
    },
  },
];

export const EXERCISES = [
  {
    id: '1',
    icon: '20-20-20',
    title: { es: 'Regla 20-20-20', en: '20-20-20 Rule' },
    duration: { es: '20 segundos', en: '20 seconds' },
    description: {
      es: 'Cada 20 minutos de uso de pantalla, mira algo a 6 metros de distancia durante 20 segundos. Relaja el músculo ciliar y reduce la fatiga.',
      en: 'Every 20 minutes of screen use, look at something 6 meters away for 20 seconds. Relaxes the ciliary muscle and reduces fatigue.',
    },
    steps: {
      es: [
        '1. Configura una alarma cada 20 minutos',
        '2. Al sonar, levanta la vista de la pantalla',
        '3. Mira un objeto lejano (ventana, pared, árbol)',
        '4. Mantén la mirada 20 segundos sin forzar',
        '5. Vuelve al trabajo con los ojos descansados',
      ],
      en: [
        '1. Set an alarm every 20 minutes',
        '2. When it rings, look away from the screen',
        '3. Look at a distant object (window, wall, tree)',
        '4. Hold your gaze for 20 seconds without straining',
        '5. Return to work with rested eyes',
      ],
    },
  },
  {
    id: '2',
    icon: 'parpadeo',
    title: { es: 'Parpadeo lento completo', en: 'Slow complete blinking' },
    duration: { es: '1–2 minutos', en: '1–2 minutes' },
    description: {
      es: 'Un parpadeo lento y completo distribuye mejor la lágrima. Un parpadeo lento equivale a 3–4 rápidos en efectividad.',
      en: 'A slow, complete blink distributes tears better. One slow blink equals 3–4 quick ones in effectiveness.',
    },
    steps: {
      es: [
        '1. Cierra los ojos suavemente',
        '2. Mantenlos cerrados 2–3 segundos',
        '3. Ábrelos lentamente',
        '4. Repite 10–15 veces',
        '5. Hazlo cada hora de trabajo con pantallas',
      ],
      en: [
        '1. Close your eyes gently',
        '2. Keep them closed for 2–3 seconds',
        '3. Open slowly',
        '4. Repeat 10–15 times',
        '5. Do it every hour of screen work',
      ],
    },
  },
  {
    id: '3',
    icon: 'figura8',
    title: { es: 'Figura 8 con la mirada', en: 'Figure 8 with gaze' },
    duration: { es: '1 minuto', en: '1 minute' },
    description: {
      es: 'Seguir un 8 horizontal con la mirada ejercita los músculos extraoculares y mejora la flexibilidad del enfoque.',
      en: 'Following a horizontal 8 with your gaze exercises extraocular muscles and improves focus flexibility.',
    },
    steps: {
      es: [
        '1. Imagina un 8 horizontal acostado',
        '2. Sigue el contorno con los ojos',
        '3. Haz 5 veces en un sentido',
        '4. Luego 5 veces en el otro',
        '5. Mantén la cabeza quieta',
      ],
      en: [
        '1. Imagine a horizontal figure 8',
        '2. Follow the outline with your eyes',
        '3. Do 5 times in one direction',
        '4. Then 5 times in the other',
        '5. Keep your head still',
      ],
    },
  },
  {
    id: '4',
    icon: 'enfocar',
    title: { es: 'Enfoque cercano y lejano', en: 'Near and far focus' },
    duration: { es: '1–2 minutos', en: '1–2 minutes' },
    description: {
      es: 'Alternar entre un objeto cercano y uno lejano entrena el músculo ciliar y previene la fatiga por acomodación.',
      en: 'Alternating between near and far objects trains the ciliary muscle and prevents accommodation fatigue.',
    },
    steps: {
      es: [
        '1. Mantén el pulgar a 25 cm de la nariz',
        '2. Mira el pulgar 5 segundos',
        '3. Cambia la mirada a algo lejano 5 segundos',
        '4. Alterna 10 veces',
        '5. Hazlo sin mover la cabeza',
      ],
      en: [
        '1. Hold your thumb 25 cm from your nose',
        '2. Look at your thumb for 5 seconds',
        '3. Shift gaze to something far for 5 seconds',
        '4. Alternate 10 times',
        '5. Do it without moving your head',
      ],
    },
  },
  {
    id: '5',
    icon: 'masaje',
    title: { es: 'Masaje suave de párpados', en: 'Gentle eyelid massage' },
    duration: { es: '30 segundos', en: '30 seconds' },
    description: {
      es: 'Un masaje ligero en los párpados estimula la producción de lágrimas y mejora el drenaje de las glándulas de Meibomio.',
      en: 'A light massage on the eyelids stimulates tear production and improves Meibomian gland drainage.',
    },
    steps: {
      es: [
        '1. Cierra los ojos',
        '2. Con los dedos índice y medio',
        '3. Masajea suavemente el párpado superior',
        '4. De la nariz hacia afuera',
        '5. Repite en el párpado inferior',
      ],
      en: [
        '1. Close your eyes',
        '2. With index and middle fingers',
        '3. Gently massage the upper eyelid',
        '4. From nose outward',
        '5. Repeat on lower eyelid',
      ],
    },
  },
];
