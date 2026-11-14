/* Imagery is served from Unsplash's CDN at responsive widths. */
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const srcSet = (id: string, widths = [640, 1024, 1600, 2400]) =>
  widths.map((w) => `${img(id, w)} ${w}w`).join(', ');

export const IMG = {
  hero: '1618418721668-0d1f72aa4bab',
  laferrari: '1617654112368-307921291f42',
  porscheBlack: '1611821064430-0d40291d0f0b',
  garage: '1626668893632-6f3a4466d22f',
  interior: '1610647752706-3bb12232b3ab',
  gt3: '1580274455191-1c62238fa333',
  headlight: '1542282088-fe8426682b8f',
  washing: '1607860108855-64acf2078ed9',
  spray: '1520340356584-f9917d1eea6f',
  panamera: '1503376780353-7e6692767b70',
  bugatti: '1544636331-e26879cd4d9b',
  mustang: '1494976388531-d1058494cdd8',
  coupeRoad: '1556189250-72ba954cfc2b',
  redGarage: '1590362891991-f776e747a588',
  amg: '1618843479313-40f8afb4b4d8',
  fog: '1609521263047-f8f205293f24',
} as const;

export type Discipline = {
  id: string;
  name: string;
  short: string;
  long: string;
  duration: string;
  from: string;
  image: string;
  alt: string;
  includes: string[];
};

export const DISCIPLINES: Discipline[] = [
  {
    id: 'paint-correction',
    name: 'Paint Correction',
    short: 'Swirls, holograms and oxidation, polished out of the clear coat by hand.',
    long: 'Multi-stage machine polishing that removes the fine scratches every wash leaves behind. We measure before we cut, take only what the clear coat can safely give, and refine until the paint reads like liquid under a single point of light.',
    duration: '2–4 days',
    from: '£1,400',
    image: IMG.laferrari,
    alt: 'Black supercar front in a dark studio, light tracing its bodywork',
    includes: [
      'Paint depth readings on every panel',
      'Iron, tar and clay decontamination',
      'Two- or three-stage machine correction',
      'Inspection under 5,600K high-CRI light',
    ],
  },
  {
    id: 'ceramic',
    name: 'Ceramic Protection',
    short: 'A glass-hard layer that keeps the finish we just created.',
    long: 'A professional-grade ceramic coating, applied panel by panel and cured overnight in a climate-controlled bay. It sheds water, resists etching from the road, and makes every future wash gentler on the paint.',
    duration: '2 days, incl. curing',
    from: '£950',
    image: IMG.porscheBlack,
    alt: 'Black Porsche 911 parked on a city street, its gloss paint reflecting buildings',
    includes: [
      'Full correction prep or enhancement polish',
      'Coating on paint, wheels and glass',
      'Overnight curing at a controlled 21°C',
      'Twelve-month inspection visit',
    ],
  },
  {
    id: 'ppf',
    name: 'Protection Film',
    short: 'Self-healing urethane, cut to the panel and wrapped invisibly.',
    long: 'Optically clear, self-healing film that absorbs stone chips before they reach the paint. Every edge is wrapped where the panel allows, so the film disappears — no visible seams on the leading edges.',
    duration: '3–5 days',
    from: '£2,200',
    image: IMG.garage,
    alt: 'Dark muscle car inside a cool-lit workshop with tail lights glowing',
    includes: [
      'Front-end, track pack or full-body coverage',
      'Wrapped edges and hand-trimmed seams',
      'Gloss or satin finish options',
      'Correction before application',
    ],
  },
  {
    id: 'interior',
    name: 'Interior Restoration',
    short: 'Leather, Alcantara and carpet, cleaned and returned to their original feel.',
    long: 'PH-neutral cleaning, steam and extraction for every material in the cabin. Leather is fed and protected, Alcantara is lifted rather than flattened, and the smallest vents are cleaned by brush.',
    duration: '1–2 days',
    from: '£650',
    image: IMG.interior,
    alt: 'Car interior with steering wheel and centre touchscreen',
    includes: [
      'Leather cleaning, conditioning and protection',
      'Alcantara and suede restoration',
      'Steam sanitising and odour treatment',
      'Glass, trim and headliner detailing',
    ],
  },
  {
    id: 'concours',
    name: 'Concours Preparation',
    short: 'Every surface, seen and unseen, prepared for judging.',
    long: 'For the lawn, the auction or the collection. Engine bay, underside, wheel wells and the places a judge’s torch finds first. We work to the standard of the event and document everything we do.',
    duration: '6–10 days',
    from: 'By consultation',
    image: IMG.gt3,
    alt: 'Black Porsche GT3 in low light',
    includes: [
      'Full exterior correction and protection',
      'Engine bay and underside detailing',
      'Wheel-off cleaning of arches and calipers',
      'Photographic condition report',
    ],
  },
];

export const PROCESS = [
  {
    title: 'Arrival & inspection',
    text: 'We measure paint depth on every panel and photograph each defect under inspection lighting. You receive the report before we touch the car.',
    detail: 'Day one',
    image: IMG.headlight,
    alt: 'Close-up of a headlight glowing blue in darkness',
  },
  {
    title: 'Decontamination',
    text: 'Snow foam, a two-bucket hand wash, iron fallout remover and clay. Everything that sits on the paint, removed. Nothing that is the paint.',
    detail: 'Day one',
    image: IMG.washing,
    alt: 'Detailer hand-washing a black car covered in foam',
  },
  {
    title: 'Correction',
    text: 'Machine polishing, panel by panel, in as many stages as the clear coat can safely give, checked against the lamp after every pass.',
    detail: 'Days two to four',
    image: IMG.laferrari,
    alt: 'Supercar bodywork with soft studio reflections',
  },
  {
    title: 'Protection',
    text: 'Ceramic or film is applied in our climate-controlled bay, then left to cure overnight, undisturbed and dust-free.',
    detail: 'Day four',
    image: IMG.porscheBlack,
    alt: 'Black Porsche with deep, glossy paint',
  },
  {
    title: 'Handover',
    text: 'A final walk-around together, in daylight and under the lamp. Then the keys, and a care guide written for your car.',
    detail: 'Day five',
    image: IMG.coupeRoad,
    alt: 'A black coupé driving away along a tree-lined road',
  },
];

export const COMMISSIONS = [
  { image: IMG.bugatti, car: 'Bugatti Chiron', work: 'Concours preparation', alt: 'Silver and black Bugatti Chiron front view' },
  { image: IMG.mustang, car: 'Ford Mustang GT', work: 'Paint correction & ceramic', alt: 'Dark grey Ford Mustang, head-on, under an overcast sky' },
  { image: IMG.redGarage, car: 'Mercedes-AMG Coupé', work: 'Full-body protection film', alt: 'White Mercedes coupe in a red-lit garage' },
  { image: IMG.amg, car: 'Mercedes-AMG GT', work: 'Two-stage correction', alt: 'Grey Mercedes-AMG GT on a road' },
  { image: IMG.panamera, car: 'Porsche Panamera', work: 'Ceramic & interior restoration', alt: 'Dark grey Porsche Panamera on an open road at dusk' },
];

export const PROGRAMMES = {
  tiers: [
    { name: 'Maintenance', price: '£180', unit: 'per visit', note: 'Monthly, for one coated car' },
    { name: 'Collector', price: '£420', unit: 'per month', note: 'Up to three cars, on rotation' },
    { name: 'Concours', price: 'Bespoke', unit: '', note: 'Event-led, scoped with you' },
  ],
  rows: [
    { label: 'Safe hand wash & dry', values: ['Included', 'Included', 'Included'] },
    { label: 'Coating top-up', values: ['Quarterly', 'Monthly', 'Per event'] },
    { label: 'Interior refresh', values: ['—', 'Included', 'Included'] },
    { label: 'Collection & delivery', values: ['—', 'Within 30 miles', 'Anywhere'] },
    { label: 'Priority booking', values: ['—', 'Included', 'Included'] },
  ],
};

export const FAQ = [
  {
    q: 'How far ahead should I book?',
    a: 'Most commissions are booked four to six weeks ahead. Maintenance visits can usually be scheduled within the week.',
  },
  {
    q: 'Can I visit while the car is with you?',
    a: 'Yes. Clients are welcome by appointment, and we send progress photographs at the end of each working day.',
  },
  {
    q: 'Will correction thin my paint?',
    a: 'We measure every panel before polishing and work within a safe margin of the clear coat. If a defect is too deep to remove safely, we tell you and leave it.',
  },
  {
    q: 'Do you collect and deliver?',
    a: 'Within 30 miles of the studio, in an enclosed transporter. Further afield is arranged case by case.',
  },
  {
    q: 'Is the car insured while it is here?',
    a: 'Yes. The studio carries full motor trade and premises cover, and the building is alarmed and monitored around the clock.',
  },
];
