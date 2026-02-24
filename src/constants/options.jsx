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


export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {travler} with a {budget} budget. The trip starts on {startDate}. The traveler's style is '{travelStyle}' with a travel pace of '{pace}/100', and they have specific interests in: {interests}. 

Return the response EXACTLY in the following JSON format structure, with no additional markdown formatting, just the raw JSON string:
{
  "tripDetails": {
    "location": "string",
    "theme": "string (a catchy 2-word title for the trip)",
    "estimatedBudget": "string",
    "weatherForecast": {
      "temperature": "string (e.g., 65°F or 18°C)",
      "condition": "string (e.g., Partly Cloudy • High UV)"
    }
  },
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "hotelImageUrl": "string",
      "geoCoordinates": "latitude,longitude",
      "rating": "number",
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": "number",
      "date": "string (e.g., Thursday, Oct 12 based on the startDate provided)",
      "theme": "string (e.g., Arrival & City Exploration)",
      "activityLevel": "string (e.g., Light Activity, Medium Activity)",
      "plan": [
        {
          "time": "string (e.g. 09:00 AM)",
          "category": "string (e.g., Transport, Culinary, Landmark, Culture, Activity)",
          "placeName": "string",
          "placeDetails": "string",
          "placeImageUrl": "string",
          "geoCoordinates": "latitude,longitude",
          "ticketPricing": "string",
          "rating": "number",
          "timeToTravel": "string"
        }
      ]
    }
  ]
}`