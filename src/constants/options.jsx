export const SelectTravelsList = [
  {
    id: 1,
    title: 'Solo',
    desc: 'Solo Exploration',
    icon: 'person',
    people: '1'
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Romantic Getaway',
    icon: 'favorite',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Friends',
    desc: 'Group Adventure',
    icon: 'group',
    people: '3 to 6 People'
  },
  {
    id: 4,
    title: 'Family',
    desc: 'All Ages',
    icon: 'family_restroom',
    people: '3 to 5 People'
  }
];

export const BudgetOptionsList = [
  {
    id: 1,
    title: 'Essential',
    desc: 'Conscious exploration',
    icon: 'savings',
    people: '1 to 2 People'
  },
  {
    id: 2,
    title: 'Balanced',
    desc: 'Comfort meets value',
    icon: 'wallet',
    people: '2 to 4 People'
  },
  {
    id: 3,
    title: 'Opulent',
    desc: 'Limitless possibilities',
    icon: 'diamond',
    people: '4+ People'
  }
];


export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {travler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'