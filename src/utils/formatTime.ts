import i18n from '../i18n/i18n';

// Yalnızca İngilizce'de 12 saat (AM/PM) biçimi kullanılır; Türkçe, Almanca,
// Fransızca ve Rusça 24 saat biçimini kullanır.
const TWELVE_HOUR_LANGUAGES = ['en'];

const uses12Hour = (language?: string): boolean => {
  const lng = (language ?? i18n.language ?? 'tr').split('-')[0];
  return TWELVE_HOUR_LANGUAGES.includes(lng);
};

/** Saat ve dakikayı geçerli dilin biçimine göre yazar. */
export const formatHourMinute = (
  hours: number,
  minutes: number,
  language?: string
): string => {
  const mm = minutes.toString().padStart(2, '0');
  if (!uses12Hour(language)) {
    return `${hours.toString().padStart(2, '0')}:${mm}`;
  }
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${mm} ${period}`;
};

/** "HH:MM" biçimindeki metni geçerli dile göre biçimlendirir. */
export const formatTimeString = (time: string, language?: string): string => {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hours = parseInt(h, 10);
  const minutes = parseInt(m, 10);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;
  return formatHourMinute(hours, minutes, language);
};

/** Bir Date nesnesinin saatini geçerli dile göre biçimlendirir. */
export const formatDateTime = (date: Date, language?: string): string =>
  formatHourMinute(date.getHours(), date.getMinutes(), language);

/** Haftanın günü kısaltmaları (0 = Pazar), i18n üzerinden. */
export const dayShortName = (day: number): string =>
  i18n.t(`day_short_${day}`);

/** Gün seçici için tek/iki harflik kısaltmalar (0 = Pazar). */
export const dayInitial = (day: number): string =>
  i18n.t(`day_initial_${day}`);
