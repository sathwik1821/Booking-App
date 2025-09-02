export const SERVICE_LIST = [
  {
    id: 1,
    title: 'Stays',
    icon: 'bed',
    active: true,
  },
  {
    id: 2,
    title: 'Flights',
    icon: 'flight',
  },
  {
    id: 4,
    title: 'Car rentals',
    icon: 'car',
  },
  {
    id: 5,
    title: 'Attractions',
    icon: 'attraction',
  },
  {
    id: 6,
    title: 'Airport taxis',
    icon: 'taxi',
  },
];


export const TRENDING_DESTINATIONS = [
  {
    title: 'New Delhi',
    image: 'delhi.jpg',
    className: 'sm:col-span-3 sm:col-start-1 col-span-full',
  },
  {
    title: 'Bangalore',
    image: 'bangalore.jpg',
    className: 'sm:col-span-3 sm:col-start-4 col-span-full',
  },
  {
    title: 'Mumbai',
    image: 'mumbai.jpg',
    className: 'md:col-span-2 md:col-start-1 col-span-full',
  },
  {
    title: 'Chennai',
    image: 'chennai.jpg',
    className: 'md:col-span-2 md:col-start-3 sm:col-span-3 col-span-full',
  },
  {
    title: 'Hyderabad',
    image: 'hyderabad.jpg',
    className: 'md:col-span-2 md:col-start-5 sm:col-span-3 col-span-full',
  },
];

export const FOOTER_SECTION = [
  {
    title: 'Support',
    links: [
      { text: 'Coronavirus (COVID-19) FAQs', href: '#' },
      { text: 'Manage your trips', href: '#' },
      { text: 'Contact Customer Service', href: '#' },
      { text: 'Safety resource centre', href: '#' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { text: 'Genius loyalty programme', href: '#' },
      { text: 'Seasonal and holiday deals', href: '#' },
      { text: 'Travel articles', href: '#' },
      { text: 'Booking.com for Business', href: '#' },
      { text: 'Traveller Review Awards', href: '#' },
      { text: 'Car hire', href: '#' },
      { text: 'Flight finder', href: '#' },
      { text: 'Restaurant reservations', href: '#' },
      { text: 'Booking.com for Travel Agents', href: '#' },
    ],
  },
  {
    title: 'Terms and settings',
    links: [
      { text: 'Privacy & cookies', href: '#' },
      { text: 'Terms and conditions', href: '#' },
      { text: 'Grievance officer', href: '#' },
      { text: 'Modern Slavery Statement', href: '#' },
      { text: 'Human Rights Statement', href: '#' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { text: 'Extranet login', href: '#' },
      { text: 'Partner help', href: '#' },
      { text: 'List your property', href: '#' },
      { text: 'Become an affiliate', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { text: 'About Booking.com', href: 'https://codingshuttle.com' },
      { text: 'How we work', href: '#' },
      { text: 'Sustainability', href: '#' },
      { text: 'Press centre', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Investor relations', href: '#' },
      { text: 'Corporate contact', href: '#' },
    ],
  },
];


export const SOCIAL_LINKS = [
  { icon: 'pinterest', href: '#', title: 'Pinterest' },
  { icon: 'twitter', href: '#', title: 'Twitter' },
  { icon: 'instagram', href: '#', title: 'Instagram' },
  { icon: 'youtube', href: '#', title: 'Youtube' },
];

export const DESTINATIONS = [
  { city: 'Jaipur', country: 'India' },
  { city: 'Delhi', country: 'India' },
  { city: 'Goa', country: 'India' },
  { city: 'Gurgaon', country: 'India' },
  { city: 'North Goa', country: 'India' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Bangalore', country: 'India' },
  { city: 'Hyderabad', country: 'India' },
  { city: 'Chennai', country: 'India' },
  { city: 'Pune', country: 'India' }
];


export const SEARCH_PARAMS_KEYS = {
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout',
  ROOMS: 'rooms',
  LOCATION: 'location',
  SELECTED_ROOM: 'selected_rcid',
  SORTBY: 'sort',
  PAGE: 'page',
  STAR_CATEGORY: 'star-category',
  PRICE_RANGE: 'price-range',
  NEXT_REDIRECT: 'next',
};

export const SEARCH_FILTER_LABEL_KEY = {
  popularity: 'Our top picks',
  'price-asc': 'Price (lowest first)',
  'price-desc': 'Price (highest first)',
};
export const SEARCH_FILTERS = [
  {
    label: 'Our top picks',
    value: 'popularity',
  },
  {
    label: 'Price (lowest first)',
    value: 'price-asc',
  },
  {
    label: 'Price (highest first)',
    value: 'price-desc',
  },
];
export const STAR_FILTERS = [
  {
    id: 1,
    label: '5 Star',
    value: 5,
  },
  {
    id: 2,
    label: '4 Star',
    value: 4,
  },
  {
    id: 3,
    label: '3 Star',
    value: 3,
  },
  {
    id: 4,
    label: '2 Star',
    value: 2,
  },
  {
    id: 5,
    label: '1 Star',
    value: 1,
  },
];
export const PRICE_FILTERS = [
  {
    id: 1,
    label: '₹0 - ₹500',
    value: '0-500',
  },
  {
    id: 2,
    label: '₹500 - ₹1000',
    value: '500-1000',
  },
  {
    id: 3,
    label: '₹1000 - ₹1500',
    value: '1000-1500',
  },
  {
    id: 4,
    label: '₹1500 - ₹2000',
    value: '1500-2000',
  },
  {
    id: 5,
    label: '₹2000 - ₹2500',
    value: '2000-2500',
  },
];


// Sample data to test with
export const data = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Downtown Manhattan, New York",
    price: 299,
    rating: 4.5,
    image: "https://example.com/hotel1.jpg",
    description: "Luxury hotel in the heart of the city",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant"]
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Miami Beach, Florida", 
    price: 199,
    rating: 4.2,
    image: "https://example.com/hotel2.jpg",
    description: "Beautiful beachfront resort",
    amenities: ["Beach Access", "Spa", "WiFi", "Pool"]
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Aspen, Colorado",
    price: 449,
    rating: 4.8,
    image: "https://example.com/hotel3.jpg",
    description: "Cozy mountain retreat",
    amenities: ["Ski Access", "Fireplace", "WiFi", "Restaurant"]
  }
];