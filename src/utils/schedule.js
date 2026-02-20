/**
 * Verifica si la hora actual está dentro del horario programado.
 * @param {number} startHour - Hora de inicio (0-23)
 * @param {number} endHour - Hora de fin (0-23)
 * @param {string} days - Días activos separados por coma, ej. "1,2,3,4,5" (0=Dom, 1=Lun, ...)
 */
export const isWithinSchedule = (startHour, endHour, days) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0=Dom, 1=Lun, ...
  const activeDays = days.split(',').map((d) => parseInt(d, 10));

  if (!activeDays.includes(currentDay)) return false;

  if (startHour <= endHour) {
    return currentHour >= startHour && currentHour < endHour;
  }
  // Horario que cruza medianoche (ej. 22:00 - 07:00)
  return currentHour >= startHour || currentHour < endHour;
};

/**
 * Verifica si estamos en horario silencioso (no molestar).
 * @param {number} quietStart - Hora inicio silencio (ej. 22 = 22:00)
 * @param {number} quietEnd - Hora fin silencio (ej. 7 = 07:00)
 */
export const isQuietHours = (quietStart, quietEnd) => {
  const now = new Date();
  const hour = now.getHours();

  if (quietStart <= quietEnd) {
    return hour >= quietStart && hour < quietEnd;
  }
  // Cruza medianoche (ej. 22:00 - 07:00)
  return hour >= quietStart || hour < quietEnd;
};
