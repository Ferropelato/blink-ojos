import { useState, useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';
let Proximity = null;
try {
  Proximity = require('expo-proximity');
} catch (e) {
  Proximity = null;
}

const MIN_NEAR_DURATION_MS = 1500;

/**
 * Hook que usa el sensor de proximidad real del dispositivo.
 * Cuando algo está muy cerca (ej. el dispositivo pegado al rostro),
 * emite una alerta para alejar el dispositivo.
 */
export function useProximityDistance(enabled, onTooClose) {
  const [isNear, setIsNear] = useState(false);
  const nearSinceRef = useRef(0);
  const lastAlertRef = useRef(0);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!enabled || !Proximity || Platform.OS === 'web') return;

    const init = async () => {
      try {
        const available = await Proximity.isAvailableAsync?.();
        if (!available) return;

        await Proximity.activate?.();

        subscriptionRef.current = Proximity.addProximityStateListener?.((event) => {
          const near = event?.proximityState ?? event;
          const now = Date.now();

          if (near) {
            if (nearSinceRef.current === 0) nearSinceRef.current = now;
            const duration = now - nearSinceRef.current;
            if (duration >= MIN_NEAR_DURATION_MS && now - lastAlertRef.current > 30000) {
              lastAlertRef.current = now;
              if (onTooClose) {
                onTooClose();
              } else {
                Alert.alert(
                  '📏 Blink',
                  'El dispositivo está muy cerca de tus ojos. Mantén una distancia de 30–40 cm para cuidar tu salud visual.',
                  [{ text: 'Entendido' }]
                );
              }
            }
            setIsNear(true);
          } else {
            nearSinceRef.current = 0;
            setIsNear(false);
          }
        });
      } catch (e) {
        // Sensor no disponible
      }
    };

    init();

    return () => {
      subscriptionRef.current?.remove?.();
      Proximity?.deactivate?.();
    };
  }, [enabled, onTooClose]);

  return { isNear, available: !!Proximity };
}
