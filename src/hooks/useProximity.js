import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

const FACE_DOWN_THRESHOLD = 7; // Z < -7 indica pantalla hacia abajo
const FLAT_THRESHOLD = 7; // X, Y pequeños = dispositivo horizontal
const HYSTERESIS_MS = 500; // Evitar parpadeos en la detección

/**
 * Detecta si el teléfono está boca abajo usando el acelerómetro.
 * Cuando la pantalla está hacia abajo: Z ≈ -9.8, X ≈ 0, Y ≈ 0
 */
export function useProximity(enabled) {
  const [isFaceDown, setIsFaceDown] = useState(false);
  const lastChangeRef = useRef(0);

  useEffect(() => {
    if (!enabled || Platform.OS === 'web') return;

    let subscription = null;

    const init = async () => {
      try {
        const available = await DeviceMotion.isAvailableAsync();
        if (!available) return;

        DeviceMotion.setUpdateInterval(100);

        subscription = DeviceMotion.addListener((data) => {
          const a = data.accelerationIncludingGravity;
          if (!a) return;

          const { x, y, z } = a;
          const isFlat = Math.abs(x) < FLAT_THRESHOLD && Math.abs(y) < FLAT_THRESHOLD;
          const screenDown = z < -FACE_DOWN_THRESHOLD;

          const faceDown = isFlat && screenDown;
          const now = Date.now();

          setIsFaceDown((prev) => {
            if (faceDown === prev) return prev;
            if (now - lastChangeRef.current < HYSTERESIS_MS) return prev;
            lastChangeRef.current = now;
            return faceDown;
          });
        });
      } catch (e) {
        // Sensor no disponible
      }
    };

    init();

    return () => {
      subscription?.remove();
    };
  }, [enabled]);

  return isFaceDown;
}
