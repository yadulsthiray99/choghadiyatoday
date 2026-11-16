// Editorial content for the choghadiya-type and hora pages. Traditional associations are written as tradition
// ("traditionally", "is considered"), not as fact. Planet rulers follow the weekday-lord rule the engine uses:
// the first day choghadiya of each weekday belongs to that weekday's planet.

export type TypeInfo = {
  slug: string; k: string; planet: string; nature: 'best' | 'good' | 'neutral' | 'avoid';
  short: string; intro: string[]; goodFor: string[]; avoidFor: string[]; note: string; hiLine: string;
};

export const TYPES: TypeInfo[] = [
  {
    slug: 'amrit-choghadiya', k: 'amrit', planet: 'moon', nature: 'best',
    short: 'The most auspicious choghadiya, suitable for almost any work.',
    intro: [
      'Amrit means nectar. Of the seven choghadiya, Amrit is treated as the most favourable, and many families wait for it before starting anything they consider important: signing papers, a griha pravesh, the first sale of the day or a long journey.',
      'Amrit is ruled by the Moon. That is why it is the first choghadiya of the day on Monday (Somvar, the Moon\'s day), and why it appears once in the day and once in the night on every weekday.',
    ],
    goodFor: ['Starting a new job, business or shop', 'Religious ceremonies, puja and griha pravesh', 'Buying gold, a vehicle or property', 'Travel and medical treatment', 'Any work you want to begin with a good sign'],
    avoidFor: ['Nothing is traditionally barred in Amrit, but when it overlaps Rahu Kaal many people still wait for Rahu Kaal to end'],
    note: 'On a Monday the day opens with Amrit at sunrise, which makes early Monday morning a popular time for openings in Gujarat and Rajasthan.',
    hiLine: 'अमृत चौघड़िया सबसे शुभ माना जाता है। इसका स्वामी चंद्रमा है, और यह हर काम की शुरुआत के लिए उत्तम है।',
  },
  {
    slug: 'shubh-choghadiya', k: 'shubh', planet: 'jupiter', nature: 'good',
    short: 'Auspicious: the choghadiya most often chosen for ceremonies and marriage-related events.',
    intro: [
      'Shubh means auspicious. It is ruled by Jupiter (Guru), the planet of wisdom, teachers and blessings, so it is the choghadiya traditionally preferred for ceremonies: engagement and marriage functions, naming ceremonies, the start of studies and religious rituals.',
      'Because Jupiter rules Thursday (Guruvar), the day choghadiya on Thursday begins with Shubh at sunrise.',
    ],
    goodFor: ['Marriage, engagement and other family ceremonies', 'Puja, havan and temple visits', 'Starting studies or a course', 'Meeting elders, teachers or officials for a request', 'Signing agreements'],
    avoidFor: ['Very little; as with Amrit, people often skip the part of Shubh that overlaps Rahu Kaal'],
    note: '"Shubh labh" (शुभ लाभ) together is the classic pair for opening an account book or a shop. On many days a Shubh and a Labh period fall close together.',
    hiLine: 'शुभ चौघड़िया का स्वामी गुरु (बृहस्पति) है। विवाह, पूजा, शिक्षा और मांगलिक कार्यों के लिए इसे श्रेष्ठ माना जाता है।',
  },
  {
    slug: 'labh-choghadiya', k: 'labh', planet: 'mercury', nature: 'good',
    short: 'Profit: favoured for business, trade, money matters and learning.',
    intro: [
      'Labh means profit or gain. It is ruled by Mercury (Budh), the planet of trade, speech and intelligence, which is why traders look for Labh choghadiya to open a shop, make the first sale, start a new account book or invest.',
      'Mercury rules Wednesday (Budhvar), so on Wednesdays the day choghadiya starts with Labh at sunrise.',
    ],
    goodFor: ['Opening a shop or business, the first sale (bohni)', 'Investments, loans and banking work', 'Starting education or an exam form', 'Business meetings and contracts', 'Diwali Chopda Pujan and other account-book rituals'],
    avoidFor: ['Little is traditionally avoided; it is a good choghadiya'],
    note: 'On Diwali, families who do Chopda Pujan usually choose a Labh, Amrit or Shubh choghadiya in the evening, after sunset (night choghadiya).',
    hiLine: 'लाभ चौघड़िया का स्वामी बुध है। व्यापार, निवेश, नया खाता और शिक्षा की शुरुआत के लिए यह शुभ है।',
  },
  {
    slug: 'chal-choghadiya', k: 'chal', planet: 'venus', nature: 'neutral',
    short: 'Movement (Char/Chal): good for travel and routine work; neutral otherwise.',
    intro: [
      'Chal (also written Char, चर) means moving. It is ruled by Venus (Shukra). Chal is counted among the usable choghadiya but is considered neutral rather than strongly auspicious: good for anything that involves movement, and fine for routine work.',
      'Venus rules Friday (Shukravar), so the day choghadiya on Friday starts with Chal.',
    ],
    goodFor: ['Starting a journey, booking or picking up a vehicle', 'Shifting house or moving goods', 'Routine work and errands', 'Buying clothes, cosmetics and items for the home'],
    avoidFor: ['Major once-in-a-lifetime ceremonies, for which families usually prefer Amrit, Shubh or Labh'],
    note: 'Some panchangs list Chal as "neutral" rather than "good"; this site marks it green because it is traditionally allowed for travel and everyday work.',
    hiLine: 'चर (चल) चौघड़िया का स्वामी शुक्र है। यात्रा और सामान्य कार्यों के लिए इसे ठीक माना जाता है।',
  },
  {
    slug: 'udveg-choghadiya', k: 'udveg', planet: 'sun', nature: 'avoid',
    short: 'Anxiety: avoided for new work, with government work as the traditional exception.',
    intro: [
      'Udveg means anxiety or restlessness. It is ruled by the Sun (Surya). Udveg is one of the three choghadiya that are usually avoided for beginning anything new, because work started in it is believed to bring worry and delay.',
      'The Sun rules Sunday (Ravivar), so Sunday\'s day choghadiya starts with Udveg at sunrise.',
    ],
    goodFor: ['Government-related work, meeting officials or authority figures (the traditional exception, since the Sun represents the state)'],
    avoidFor: ['Starting a business or a new job', 'Ceremonies and auspicious events', 'Major purchases'],
    note: 'If you have to start something in Udveg, the usual advice is simply to wait for the next good choghadiya, which is never more than one or two periods away.',
    hiLine: 'उद्वेग चौघड़िया का स्वामी सूर्य है। नए कार्य इसमें टाले जाते हैं, पर सरकारी कार्य के लिए इसे ठीक माना जाता है।',
  },
  {
    slug: 'rog-choghadiya', k: 'rog', planet: 'mars', nature: 'avoid',
    short: 'Disease: avoided for auspicious work; traditionally linked to disputes and conflict.',
    intro: [
      'Rog means disease. It is ruled by Mars (Mangal), the planet of conflict and energy, and is avoided for anything auspicious. Traditionally it is the one choghadiya considered suitable for confrontation: debates, legal disputes or action against an opponent.',
      'Mars rules Tuesday (Mangalvar), so Tuesday\'s day choghadiya begins with Rog.',
    ],
    goodFor: ['Traditionally: debates, legal disputes and competitive action'],
    avoidFor: ['Starting medical treatment or surgery by choice', 'Ceremonies, travel and new ventures', 'Buying property or vehicles'],
    note: 'Rog is often listed simply as "avoid". The debate and dispute use is a traditional note, not a recommendation.',
    hiLine: 'रोग चौघड़िया का स्वामी मंगल है। शुभ कार्यों में इसे टाला जाता है।',
  },
  {
    slug: 'kaal-choghadiya', k: 'kaal', planet: 'saturn', nature: 'avoid',
    short: 'Loss: avoided for new work; traditionally linked only to collecting dues.',
    intro: [
      'Kaal means time in its destructive sense, and this choghadiya is associated with loss. It is ruled by Saturn (Shani). New and auspicious work is avoided in Kaal; the one traditional exception is work to accumulate or recover wealth, such as collecting dues.',
      'Saturn rules Saturday (Shanivar), so Saturday\'s day choghadiya begins with Kaal at sunrise.',
    ],
    goodFor: ['Traditionally: collecting money owed, repairs and hard physical work'],
    avoidFor: ['Ceremonies and new beginnings', 'Travel and major purchases', 'Signing agreements'],
    note: 'Do not confuse Kaal choghadiya with Rahu Kaal: they are separate systems. Rahu Kaal is one-eighth of the day fixed by weekday; Kaal choghadiya is one of the seven choghadiya types.',
    hiLine: 'काल चौघड़िया का स्वामी शनि है। नए और शुभ कार्य इसमें नहीं किए जाते।',
  },
];

export const HORA_INFO: Record<string, { use: string; avoid: string }> = {
  sun: { use: 'Government work, meeting officials or a boss, applying for permissions, matters of authority and father', avoid: 'Starting partnerships or asking for favours from equals' },
  moon: { use: 'Travel, public dealings, family and home matters, anything involving water, milk or food', avoid: 'Decisions you want to stay fixed (the Moon is considered changeable)' },
  mars: { use: 'Property and land, physical work, sport, courage-related tasks, dealing with disputes', avoid: 'Ceremonies, new partnerships and marriage-related talks' },
  mercury: { use: 'Trade, study, writing, communication, calls and emails, signing documents, buying gadgets', avoid: 'Little is traditionally avoided' },
  jupiter: { use: 'Religious work, education, marriage proposals, meeting teachers or elders, financial planning', avoid: 'Little is traditionally avoided; it is the most favoured hora' },
  venus: { use: 'Arts, music, romance, buying clothes, jewellery, cosmetics or a vehicle, entertainment', avoid: 'Hard confrontations' },
  saturn: { use: 'Labour, repairs, cleaning, dealing with old matters, iron and oil-related work', avoid: 'New beginnings, ceremonies and travel' },
};
