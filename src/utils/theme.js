// Colores pensados para reducir fatiga ocular: tonos suaves, calma, sin brillo excesivo
export const themeColors = {
  dark: {
    bg: '#1a2a24',
    cardBg: '#243830',
    primary: '#3d7a65',
    primaryActive: '#c45c4a',
    text: '#fff',
    textMuted: '#8ba89a',
    textDim: '#6b7a72',
    accent: '#6b9b8a',
    dot: '#3d5a50',
    optionBg: '#2d3d36',
    optionActiveBg: '#2d5a4a',
    optionText: '#8ba89a',
  },
  // Modo claro saludable: blanco cálido, gris suave, texto gris oscuro/verde grisáceo
  light: {
    bg: '#f5f3f0',           // Blanco ligeramente crema / gris cálido suave
    cardBg: '#faf9f7',       // Blanco cálido
    primary: '#4a6b5c',      // Verde grisáceo suave
    primaryActive: '#b84a38',
    text: '#3d4a45',         // Gris oscuro / verde grisáceo
    textMuted: '#5a6b64',    // Gris medio
    textDim: '#6b7a72',
    accent: '#4a6b5c',
    dot: '#b0c4b8',
    optionBg: '#e8e6e2',     // Gris claro neutro
    optionActiveBg: '#4a6b5c',
    optionText: '#5a6b64',
  },
};

export const getThemeColors = (theme = 'dark') => themeColors[theme] || themeColors.dark;
