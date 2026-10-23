import cities from '../data/cities.json';
import { choghadiya, todayIST, NAMES, WEEKDAY, hm, dateText } from './chog.mjs';

export type City = (typeof cities)[number];
export const CITIES = cities as City[];
export const DEFAULT = CITIES.find((c) => c.slug === 'ahmedabad')!;
// Cities with their own page: the ones people search for (choghadiya.csv demand), spread across India.
// Nearby towns would be near-copies (sunrise within a minute), so they are served by the home-page city picker instead.
const PAGE = ['mumbai', 'ahmedabad', 'jaipur', 'delhi', 'surat', 'pune', 'jodhpur', 'vadodara', 'bengaluru', 'udaipur', 'indore', 'rajkot',
  'kolkata', 'bikaner', 'bhopal', 'gurugram', 'hyderabad', 'lucknow', 'ajmer', 'kota', 'chennai',
  'raipur', 'jamnagar', 'ujjain', 'nagpur', 'bhavnagar', 'kanpur'];
export const PAGE_CITIES = PAGE.map((s) => CITIES.find((c) => c.slug === s)!).filter(Boolean);
export const hasPage = (c: { slug: string }) => PAGE.includes(c.slug);
const GU_PAGE = ['ahmedabad', 'surat', 'vadodara', 'rajkot', 'jamnagar', 'bhavnagar', 'mumbai'];
export const GU_CITIES = GU_PAGE.map((s) => CITIES.find((c) => c.slug === s)!);

// The build runs every night just after midnight IST, so "today" is the IST date at build time.
export const [Y, M, D] = todayIST();
export const addDays = (n: number) => { const t = new Date(Date.UTC(Y, M - 1, D + n)); return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()] as const; };
export const ISO = `${Y}-${String(M).padStart(2, '0')}-${String(D).padStart(2, '0')}`;

export const forCity = (c: City, offset = 0) => { const [y, m, d] = addDays(offset); return choghadiya(y, m, d, c.lat, c.lon); };
export type Chog = ReturnType<typeof forCity>;

/** Good periods (Amrit, Shubh, Labh) of the day and night, in time order. */
export const goodOf = (r: Chog) => [...r.day, ...r.night].filter((p) => ['amrit', 'shubh', 'labh'].includes(p.k));
export const label = (k: string, lang: 'en' | 'hi' | 'gu' = 'en') => (NAMES as any)[k][lang];
export const isGood = (k: string) => (NAMES as any)[k].good;
export const wd = (r: Chog, lang: 'en' | 'hi' | 'gu' = 'en') => WEEKDAY[lang][r.wd];
export const dt = (r: Chog, lang: 'en' | 'hi' | 'gu' = 'en') => dateText(r.y, r.m, r.d, lang);
export const span = (p: { from: number; to: number }) => `${hm(p.from)} – ${hm(p.to)}`;
export const cityUrl = (c: City) => `/${c.slug}/`;
export const guUrl = (c: City) => `/gujarati/${c.slug}/`;
export const near = (c: City, n = 8) => PAGE_CITIES.filter((x) => x.slug !== c.slug && x.state === c.state).slice(0, n);
export { hm, NAMES };
