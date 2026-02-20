import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { FLASH_DURATION_MS } from '../constants';

export const BlinkOverlay = ({ visible, onComplete, flashOpacity = 0.08 }) => {
  const opacity = useRef(new Animated.Value(0)).current;

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
      style={[styles.overlay, { opacity }]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    zIndex: 9999,
  },
});
