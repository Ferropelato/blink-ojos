import { Platform } from 'react-native';
import { Audio } from 'expo-av';

const createMinimalWav = () => {
  const sr = 8000;
  const duration = 0.05;
  const freq = 200;
  const samples = Math.floor(sr * duration);
  const data = new Uint8Array(44 + samples * 2);
  const view = new DataView(data.buffer);
  let offset = 0;
  const write = (str) => {
    for (let i = 0; i < str.length; i++) data[offset++] = str.charCodeAt(i);
  };
  const write32 = (n) => {
    view.setUint32(offset, n, true);
    offset += 4;
  };
  const write16 = (n) => {
    view.setUint16(offset, n, true);
    offset += 2;
  };
  write('RIFF');
  write32(36 + samples * 2);
  write('WAVE');
  write('fmt ');
  write32(16);
  write16(1);
  write16(1);
  write32(sr);
  write32(sr * 2);
  write16(2);
  write16(16);
  write('data');
  write32(samples * 2);
  for (let i = 0; i < samples; i++) {
    const v = Math.sin((2 * Math.PI * freq * i) / sr) * 800;
    view.setInt16(offset, Math.max(-32768, Math.min(32767, v)), true);
    offset += 2;
  }
  const str = Array.from(data).map((c) => String.fromCharCode(c)).join('');
  return typeof btoa !== 'undefined' ? btoa(str) : '';
};

export const playBlinkSound = async () => {
  if (Platform.OS === 'web') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 200;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // Silently ignore
    }
    return;
  }
  try {
    await Audio.setAudioModeAsync({ playsInSilentMode: true, staysActiveInBackground: false });
    const base64 = createMinimalWav();
    if (!base64) return;
    const { sound } = await Audio.Sound.createAsync(
      { uri: `data:audio/wav;base64,${base64}` },
      { volume: 0.15 }
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.didJustFinish && !s.isLooping) sound.unloadAsync();
    });
  } catch (e) {
    // Silently ignore
  }
};
