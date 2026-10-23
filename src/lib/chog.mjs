// Choghadiya engine: sunrise/sunset (NOAA solar equations) + the traditional choghadiya and Rahu Kaal rules.
// Shared by the static build and the in-browser clock, so both always agree. India only: IST = UTC+5:30.

const RAD = Math.PI / 180;
export const IST = 330; // minutes east of UTC

/** Sunrise and sunset for a calendar date (y, m 1-12, d) at lat/lon, as minutes after local (IST) midnight.
 *  Uses the NOAA general solar position equations with the standard -0.833 deg horizon (refraction + solar radius);
 *  accurate to about a minute, which is the usual spread between published panchangs. */
export function sunTimes(y, m, d, lat, lon) {
  const doy = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 864e5);
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const g = ((2 * Math.PI) / (leap ? 366 : 365)) * (doy - 1 + 0.5); // fractional year at local noon
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
    - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const cosH = Math.cos(90.833 * RAD) / (Math.cos(lat * RAD) * Math.cos(decl)) - Math.tan(lat * RAD) * Math.tan(decl);
  const ha = Math.acos(Math.max(-1, Math.min(1, cosH))) / RAD;
  const noon = 720 - 4 * lon - eqt + IST;
  return { rise: noon - 4 * ha, set: noon + 4 * ha, noon };
}

export const NAMES = {
  amrit: { en: 'Amrit', hi: 'अमृत', gu: 'અમૃત', good: true, mean: 'nectar: the best period, good for all work' },
  shubh: { en: 'Shubh', hi: 'शुभ', gu: 'શુભ', good: true, mean: 'auspicious: good for ceremonies, marriage and new beginnings' },
  labh: { en: 'Labh', hi: 'लाभ', gu: 'લાભ', good: true, mean: 'profit: good for business, trade and starting education' },
  chal: { en: 'Chal', hi: 'चर', gu: 'ચલ', good: true, mean: 'movement: good for travel and neutral work' },
  udveg: { en: 'Udveg', hi: 'उद्वेग', gu: 'ઉદ્વેગ', good: false, mean: 'anxiety: avoid new work (government work is the exception)' },
  rog: { en: 'Rog', hi: 'रोग', gu: 'રોગ', good: false, mean: 'disease: avoid; traditionally used for debates and legal disputes' },
  kaal: { en: 'Kaal', hi: 'काल', gu: 'કાળ', good: false, mean: 'loss: avoid; traditionally used only for collecting wealth' },
};
const DAY_ORDER = ['udveg', 'chal', 'labh', 'amrit', 'kaal', 'shubh', 'rog'];
const NIGHT_ORDER = ['shubh', 'amrit', 'chal', 'rog', 'kaal', 'labh', 'udveg'];
// first day choghadiya Sun..Sat, first night choghadiya Sun..Sat
const DAY_START = ['udveg', 'amrit', 'rog', 'labh', 'shubh', 'chal', 'kaal'];
const NIGHT_START = ['shubh', 'chal', 'kaal', 'udveg', 'amrit', 'rog', 'labh'];
// Rahu Kaal = this 1/8 of daytime (1-based), Sun..Sat
const RAHU = [8, 2, 7, 5, 6, 4, 3];

export const WEEKDAY = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  gu: ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
};

const seq = (order, start) => { const i = order.indexOf(start); return Array.from({ length: 8 }, (_, k) => order[(i + k) % 7]); };

/** Full choghadiya for one date (the day that starts at that date's sunrise). Minutes are from that date's midnight IST;
 *  night periods run past midnight (> 1440) up to the next sunrise. */
export function choghadiya(y, m, d, lat, lon) {
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const t = sunTimes(y, m, d, lat, lon);
  const nd = new Date(Date.UTC(y, m - 1, d + 1));
  const t2 = sunTimes(nd.getUTCFullYear(), nd.getUTCMonth() + 1, nd.getUTCDate(), lat, lon);
  const dayLen = (t.set - t.rise) / 8, nightLen = (t2.rise + 1440 - t.set) / 8;
  const day = seq(DAY_ORDER, DAY_START[wd]).map((k, i) => ({ k, from: t.rise + i * dayLen, to: t.rise + (i + 1) * dayLen }));
  const night = seq(NIGHT_ORDER, NIGHT_START[wd]).map((k, i) => ({ k, from: t.set + i * nightLen, to: t.set + (i + 1) * nightLen }));
  const r = RAHU[wd] - 1;
  return { y, m, d, wd, rise: t.rise, set: t.set, nextRise: t2.rise + 1440, noon: t.noon, day, night,
    rahu: { from: t.rise + r * dayLen, to: t.rise + (r + 1) * dayLen }, dayLen, nightLen };
}

/** "6:42 AM" from minutes after midnight (wraps past midnight). */
export function hm(min) {
  const t = Math.round(min) % 1440, h = Math.floor(t / 60), mm = t % 60;
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}
/** "06:42" 24-hour */
export const hm24 = (min) => { const t = Math.round(min) % 1440; return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };

/** Today's date in India as [y, m, d] (works in any visitor time zone). */
export function todayIST(now = new Date()) {
  const t = new Date(now.getTime() + IST * 60000);
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
}
export const minutesNowIST = (now = new Date()) => { const t = new Date(now.getTime() + IST * 60000); return t.getUTCHours() * 60 + t.getUTCMinutes(); };

export const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  gu: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટેમ્બર', 'ઑક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'],
};
export const dateText = (y, m, d, lang = 'en') => lang === 'en' ? `${d} ${MONTHS.en[m - 1]} ${y}` : `${d} ${MONTHS[lang][m - 1]} ${y}`;
