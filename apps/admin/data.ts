export interface Show {
  _id: number;
  date: string;
  status: 'approved' | 'pending' | 'proposed';
  name: string;
  venue: Venue;
  deal: number;
}

export interface Venue {
  name: string;
  city: string;
  state: string;
}

export const shows: Show[] = [
  {
    _id: 1,
    date: '7/9/2022',
    status: 'approved',
    name: 'Bear Mountain Fest',
    deal: 2500,
    venue: {
      name: 'Bear Mountain',
      city: 'Radford',
      state: 'VA',
    },
  },
  {
    _id: 2,
    date: '7/29/2022',
    status: 'approved',
    name: 'Rumble Down Festival',
    deal: 1500,
    venue: {
      name: 'The Kampground',
      city: 'Mechanicsburg',
      state: 'IL',
    },
  },
  {
    _id: 3,
    date: '8/18/2022',
    status: 'approved',
    name: 'w/ PPPP',
    deal: 500,
    venue: {
      name: 'The Burl',
      city: 'Lexington',
      state: 'KY',
    },
  },
];
