// Brand: logo mark, homepage illustration, colours. Inline SVG only (no requests).
import { choghadiya, NAMES, hm, WEEKDAY } from './lib/chog.mjs';
export const NAME = ['Choghadiya', 'Today'];
export const COLORS = { bg: '#5b1a1a', hi: '#f59e0b', accent: '#9a3412' };
export const DOMAIN = 'choghadiyatoday.in';
export const TAGLINE = ['Aaj ka choghadiya', 'Day & night choghadiya for 99 Indian cities'];
const FONT = 'font-family="system-ui,Segoe UI,Arial,sans-serif"';

export const mark = (size = 34) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
<rect width="40" height="40" rx="9" fill="#9a3412"/>
<g stroke="#fde68a" stroke-width="2.2" stroke-linecap="round">${[-80, -55, -30, -5, 20, 45, 70].map((a) => { const r = (a - 90) * Math.PI / 180; return `<line x1="${(20 + 11 * Math.cos(r)).toFixed(1)}" y1="${(27 + 11 * Math.sin(r)).toFixed(1)}" x2="${(20 + 15.5 * Math.cos(r)).toFixed(1)}" y2="${(27 + 15.5 * Math.sin(r)).toFixed(1)}"/>`; }).join('')}</g>
<path d="M11 27a9 9 0 0 1 18 0z" fill="#f59e0b"/><rect x="5" y="27" width="30" height="2.6" rx="1.3" fill="#fde68a"/>
<rect x="9" y="32" width="22" height="2" rx="1" fill="#f59e0b" opacity=".7"/></svg>`;

const COL = { amrit: '#15803d', shubh: '#22c55e', labh: '#4ade80', chal: '#a3e635', udveg: '#fb923c', rog: '#ef4444', kaal: '#991b1b' };
/** Today's choghadiya (default Ahmedabad, 23 Oct 2026 if no date given) as two coloured bars. */
export const hero = ({ y = 2026, m = 10, d = 23, lat = 23.0258, lon = 72.5873, city = 'Ahmedabad' } = {}) => {
  const r = choghadiya(y, m, d, lat, lon);
  const X0 = 16, X1 = 344, w = (X1 - X0) / 8;
  const bar = (rows, yy) => rows.map((p, i) => `<rect x="${(X0 + i * w + 1).toFixed(1)}" y="${yy}" width="${(w - 2).toFixed(1)}" height="40" rx="5" fill="${COL[p.k]}"/>
<text x="${(X0 + i * w + w / 2).toFixed(1)}" y="${yy + 25}" text-anchor="middle" ${FONT} font-size="10.5" font-weight="700" fill="${['chal', 'labh'].includes(p.k) ? '#14532d' : '#fff'}">${NAMES[p.k].en}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 232" role="img" aria-label="${city} choghadiya for ${WEEKDAY.en[r.wd]}: day from ${hm(r.rise)}, night from ${hm(r.set)}">
<rect width="360" height="232" rx="14" fill="#fdf6ec"/>
<text x="16" y="26" ${FONT} font-size="14" font-weight="800" fill="#5b1a1a">${city} · ${WEEKDAY.en[r.wd]}</text>
<circle cx="330" cy="20" r="9" fill="#f59e0b"/>
<text x="16" y="52" ${FONT} font-size="11.5" fill="#7c2d12">Day · sunrise ${hm(r.rise)}</text>${bar(r.day, 60)}
<text x="16" y="128" ${FONT} font-size="11.5" fill="#7c2d12">Night · sunset ${hm(r.set)}</text>${bar(r.night, 136)}
<g ${FONT} font-size="10.5" fill="#57534e"><rect x="16" y="194" width="10" height="10" rx="2" fill="#22c55e"/><text x="31" y="203">Amrit · Shubh · Labh · Chal = good</text>
<rect x="16" y="211" width="10" height="10" rx="2" fill="#ef4444"/><text x="31" y="220">Udveg · Rog · Kaal = avoid</text></g></svg>`;
};
