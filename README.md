# 👁️ Blink — App de recordatorio de parpadeo

## ¿Qué es Blink?

Blink es una aplicación móvil que recuerda al usuario parpadear de forma consciente para prevenir el **síndrome de ojo seco**, un problema frecuente asociado al uso prolongado de pantallas.

---

## ¿Para qué sirve?

### El problema

Al usar pantallas (ordenador, móvil, tablet, TV), el parpadeo natural disminuye hasta un **60%**:
- **En reposo:** 15–20 parpadeos por minuto
- **Con pantallas:** 5–7 parpadeos por minuto

Esto provoca sequedad, irritación, visión borrosa y cansancio ocular.

### La solución

Blink emite recordatorios sutiles a intervalos configurables para que el usuario parpadee de forma consciente. El estímulo es **imperceptible** — no interrumpe películas, trabajo ni lectura — pero suficiente para provocar el pestañeo.

---

## ¿Cómo funciona?

| Situación | Comportamiento |
|-----------|----------------|
| **App en primer plano** | Un micro-flash breve (50 ms) sobre la pantalla — casi imperceptible |
| **App en segundo plano** | Notificación "Hora de parpadear" |
| **Inactividad** | Si no hay interacción (ej. teléfono dormido), la sesión se pausa automáticamente |

### Configuración disponible

- **Intervalo:** cada 30 s, 45 s, 1 min, 2 min o 5 min
- **Duración:** 30 min, 1 h, 2 h, 4 h, o "hasta que pause"
- **Inactividad:** pausar tras 5, 10 o 15 min sin uso
- **Intensidad del flash:** muy sutil, normal, visible o claro
- **Modo programado:** activar recordatorios en horarios fijos (días, desde/hasta)
- **Horario silencioso:** no notificar en una franja (ej. 22:00–07:00)
- **Estadísticas:** recordatorios enviados y sesiones (hoy, semana, total), exportar y resetear
- **Tipo de recordatorio:** flash, vibración o ambos
- **Sonido sutil:** tono 200 Hz opcional
- **Onboarding:** tutorial en primera ejecución
- **Accesibilidad:** tamaño de texto, preset dispositivo
- **Vídeos:** sección con enlaces a vídeos explicativos sobre cuidado ocular (YouTube)
- **Ejercicios:** 6 ejercicios oculares con pasos detallados (regla 20-20-20, parpadeo, palming, etc.)

---

## Desarrollo

### Requisitos

- Node.js 18+
- npm o yarn
- Expo Go (para probar en dispositivo físico) o emulador Android/iOS

### Instalación

```bash
cd blink-app
npm install
```

### Comandos

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android (emulador o dispositivo conectado)
npm run android

# Ejecutar en iOS (solo Mac)
npm run ios

# Versión web/PWA (instalable)
npm run web
```

Tras `npm start`, escanea el código QR con Expo Go (Android) o la cámara (iOS).

---

## Estructura del proyecto

```
blink-app/
├── App.js                    # Punto de entrada, proveedores, SafeArea
├── app.json                  # Configuración Expo (nombre, icono, plugins)
├── src/
│   ├── constants.js          # Opciones y constantes
│   ├── storage.js            # Persistencia con AsyncStorage
│   ├── navigation/
│   │   └── MainTabs.js       # Navegación por tabs (Inicio, Vídeos, Ejercicios)
│   ├── data/
│   │   ├── videos.js         # Lista de vídeos explicativos (YouTube)
│   │   └── exercises.js     # Ejercicios oculares con pasos
│   ├── context/
│   │   ├── SettingsContext.js
│   │   └── StatsContext.js
│   ├── utils/
│   │   └── schedule.js
│   ├── storage/
│   │   └── statsStorage.js   # Estadísticas por día
│   ├── hooks/
│   │   └── useSession.js
│   ├── components/
│   │   ├── BlinkOverlay.js
│   │   ├── PickerRow.js
│   │   ├── ScheduleSection.js
│   │   ├── QuietHoursSection.js
│   │   └── StatsSection.js
│   └── screens/
│       ├── HomeScreen.js     # Inicio: sesión, config, estadísticas
│       ├── VideosScreen.js   # Vídeos explicativos
│       └── ExercisesScreen.js # Ejercicios oculares
└── assets/                   # Iconos, splash
```

### Qué hace cada módulo

| Archivo | Función |
|---------|---------|
| `useSession.js` | Timer, intervalos, inactividad, modo programado, horario silencioso, notificaciones |
| `BlinkOverlay.js` | Animación de opacidad 50 ms para el estímulo visual (intensidad configurable) |
| `schedule.js` | Lógica de horarios (isWithinSchedule, isQuietHours) |
| `statsStorage.js` | Persistencia y agregación de estadísticas |
| `SettingsContext.js` | Carga y guarda la configuración del usuario |
| `storage.js` | Lee/escribe en AsyncStorage |

---

## Stack técnico

- **Expo** (React Native)
- **@react-navigation/native** + **@react-navigation/bottom-tabs** — navegación por tabs
- **expo-notifications** — notificaciones locales en segundo plano
- **@react-native-async-storage/async-storage** — persistencia de configuración

---

## Próximos pasos

Ver `ESPECIFICACION_BLINK_APP.md` en la raíz del proyecto para:
- TvOS / Android TV (proyecto separado)
- Mejoras en detección de inactividad
