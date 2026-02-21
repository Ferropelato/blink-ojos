import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { FLASH_DURATION_MS } from '../constants';

// En tema claro: flash oscuro para que sea visible sobre fondo blanco
const FLASH_COLOR_DARK = '#fff';
const FLASH_COLOR_LIGHT = '#1a1a1a';

export const BlinkOverlay = ({ visible, onComplete, flashOpacity = 0.08, theme = 'dark' }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const flashColor = theme === 'light' ? FLASH_COLOR_LIGHT : FLASH_COLOR_DARK;

  useEffect(() => {
    if (!visible) return;
    opacity.setValue(flashOpacity);
    const anim = Animated.timing(opacity, {
      toValue: 0,
      duration: FLASH_DURATION_MS,
      useNativeDriver: true,
    });
    anim.start(() => onComplete?.());
    return () => anim.stop();
  }, [visible, flashOpacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.overlay, { opacity, backgroundColor: flashColor }]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});
