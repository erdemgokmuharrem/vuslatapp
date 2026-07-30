/**
 * Gregorian → Hijri calendar conversion (pure JS, no external deps)
 * Algorithm: Kuwaiti algorithm variant
 */
export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  monthNameAr: string;
}

const HIJRI_MONTHS_TR = [
  'Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir',
  'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban',
  'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce',
];

const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبِيعُ الأَوَّل', 'رَبِيعُ الثَّانِي',
  'جُمَادَى الأُولَى', 'جُمَادَى الآخِرَة', 'رَجَب', 'شَعْبَان',
  'رَمَضَان', 'شَوَّال', 'ذُو القَعْدَة', 'ذُو الحِجَّة',
];

export function toHijri(gDate: Date): HijriDate {
  const gYear = gDate.getFullYear();
  const gMonth = gDate.getMonth() + 1; // 1-based
  const gDay = gDate.getDate();

  // Julian Day Number
  const jd =
    Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 14) / 12))) / 4) +
    Math.floor((367 * (gMonth - 2 - 12 * Math.floor((gMonth - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((gYear + 4900 + Math.floor((gMonth - 14) / 12)) / 100)) / 4) +
    gDay - 32075;

  // Convert JDN to Hijri
  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const hMonth = Math.floor((24 * l) / 709);
  const hDay = l - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  return {
    year: hYear,
    month: hMonth,
    day: hDay,
    monthName: HIJRI_MONTHS_TR[hMonth - 1] || '',
    monthNameAr: HIJRI_MONTHS_AR[hMonth - 1] || '',
  };
}

/**
 * Returns number of days until next Ramadan (Hijri month 9).
 * If currently in Ramadan, returns 0.
 */
export function getDaysToRamadan(): { daysLeft: number; inRamadan: boolean } {
  const today = new Date();
  const hijriToday = toHijri(today);

  if (hijriToday.month === 9) {
    return { daysLeft: 0, inRamadan: true };
  }

  // Search forward day by day (max 365 days) for next Ramadan start
  let daysLeft = 0;
  for (let i = 1; i <= 380; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);
    const hijriFuture = toHijri(future);
    if (hijriFuture.month === 9 && hijriFuture.day === 1) {
      daysLeft = i;
      break;
    }
  }

  return { daysLeft, inRamadan: false };
}

/**
 * Format Hijri date as string.
 * e.g. "15 Ramazan 1446"
 */
export function formatHijriDate(h: HijriDate): string {
  return `${h.day} ${h.monthName} ${h.year}`;
}

export interface ReligiousDay {
  key: string;
  month: number;
  day: number;
}

export const RELIGIOUS_DAYS: ReligiousDay[] = [
  { key: 'hijri_new_year', month: 1, day: 1 },
  { key: 'ashura', month: 1, day: 10 },
  { key: 'mawlid', month: 3, day: 12 },
  { key: 'three_months', month: 7, day: 1 },
  { key: 'miraj', month: 7, day: 27 },
  { key: 'baraat', month: 8, day: 15 },
  { key: 'ramadan_begin', month: 9, day: 1 },
  { key: 'kadir', month: 9, day: 27 },
  { key: 'eid_al_fitr', month: 10, day: 1 },
  { key: 'eid_al_adha', month: 12, day: 10 },
];

export interface UpcomingDay {
  key: string;
  daysLeft: number;
  gregorianDate: Date;
  hijriString: string;
}

/**
 * Calculates all upcoming religious days for the next hijri year
 */
export function getUpcomingReligiousDays(): UpcomingDay[] {
  const result: UpcomingDay[] = [];
  const foundKeys = new Set<string>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i <= 360; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);
    const h = toHijri(future);
    
    // Check if this date is a religious day
    const rDay = RELIGIOUS_DAYS.find(d => d.month === h.month && d.day === h.day);
    
    if (rDay && !foundKeys.has(rDay.key)) {
      foundKeys.add(rDay.key);
      result.push({
        key: rDay.key,
        daysLeft: i,
        gregorianDate: future,
        hijriString: formatHijriDate(h)
      });
    }
  }
  
  return result;
}
