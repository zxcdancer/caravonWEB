export type ServiceCategory = { title: string; items: string[] };

const NL: ServiceCategory[] = [
  {
    title: 'Technisch onderhoud & reparatie',
    items: [
      'Seizoensdiagnose van de camper',
      'Technisch onderhoud',
      'Reparatie van het onderstel',
      'Motor- en transmissiereparatie',
      'Vervanging van olie en filters',
      'Remsysteem',
      'Elektra en elektronica',
    ],
  },
  {
    title: 'Gespecialiseerde camperwerk',
    items: [
      'Reparatie en onderhoud van de woonmodule',
      'Reparatie van waterleidingen en sanitair',
      'Onderhoud van gasinstallaties',
      'Reparatie van verwarmers en boilers',
      'Onderhoud van koelkasten en airconditioning',
      'Opsporen en verhelpen van lekkages',
      'Reparatie van daken, luiken en ramen',
    ],
  },
  {
    title: 'Elektrische systemen',
    items: [
      'Installatie van zonnepanelen',
      'Montage van omvormers en laadapparaten',
      'Installatie en vervanging van accu\'s',
      'Instellen van autonome stroomsystemen',
      'Installatie van extra verlichting',
    ],
  },
  {
    title: 'Modernisering & uitrusting',
    items: [
      'Installatie van luifels en overkappingen',
      'Montage van fietsendragers',
      'Installatie van achteruitrijcamera\'s',
      'Installatie van alarmsystemen en GPS-trackers',
      'Montage van extra stopcontacten en USB-poorten',
      'Interieurombouw',
    ],
  },
  {
    title: 'Seizoens- en servicediensten',
    items: [
      'Voorbereiding op het reisseizoen',
      'Winterklaar maken',
      'Voorbereiding voor verkoop',
      'Inspectie voor aankoop van een camper',
    ],
  },
];

const EN: ServiceCategory[] = [
  {
    title: 'Technical maintenance & repair',
    items: [
      'Pre-season camper inspection',
      'Technical maintenance',
      'Chassis & suspension repair',
      'Engine & transmission repair',
      'Oil & filter replacement',
      'Brake system service',
      'Electrical & electronics',
    ],
  },
  {
    title: 'Specialized camper services',
    items: [
      'Living module repair & maintenance',
      'Water & plumbing repair',
      'Gas equipment service',
      'Heater & boiler repair',
      'Fridge & air conditioning service',
      'Leak detection & repair',
      'Roof, hatch & window repair',
    ],
  },
  {
    title: 'Electrical systems',
    items: [
      'Solar panel installation',
      'Inverter & charger installation',
      'Battery installation & replacement',
      'Autonomous power system setup',
      'Additional lighting installation',
    ],
  },
  {
    title: 'Modernization & upgrades',
    items: [
      'Awning & canopy installation',
      'Bike rack installation',
      'Rear-view camera installation',
      'Alarm & GPS tracker installation',
      'Extra sockets & USB port installation',
      'Interior conversion',
    ],
  },
  {
    title: 'Seasonal & service packages',
    items: [
      'Travel season preparation',
      'Winter storage preparation',
      'Pre-sale preparation',
      'Pre-purchase camper inspection',
    ],
  },
];

export function getServiceCategories(locale: string): ServiceCategory[] {
  return locale === 'en' ? EN : NL;
}
