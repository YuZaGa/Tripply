export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole travels in exploration',
      icon: '🚶‍♂️',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travels in tandem',
      icon: '👫',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun loving adventurers',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of friends on an adventure',
      icon: '👬',
      people: '3 to 6 People'
    },
    {
      id: 5,
      title: 'Team',
      desc: 'A team travels together for a mission',
      icon: '👨‍💼‍👨‍💼',
      people: '5 to 10 People'
    }
  ];

  export const BudgetOptionsList = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸',
      people: '1 to 2 People'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep cost on the average side',
      icon: '💰',
      people: '2 to 4 People'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Don\'t worry about cost',
      icon: '💵',
      people: '4+ People'
    }
  ];
  
  
export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {travler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'