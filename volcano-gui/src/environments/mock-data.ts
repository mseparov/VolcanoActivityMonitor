export const mockVolcanoData = [
    {
      id: 1,
      name: 'Volcano 1',
      location: 'Location 1',
      latitude: 23.456,
      longitude: -12.345,
      elevation: 1000,
      type: 'Stratovolcano',
      activity: [
        {
            VEI: 5,
            activityType: "Type 1",
            activityStart: '2022-01-01',
            activityEnd: '2022-02-02',
        },
        {
            VEI: 7,
            activityType: "Type 2",
            activityStart: '2022-02-06',
            activityEnd: '2022-07-02',
        }
      ]
    },
    {
      id: 2,
      name: 'Volcano 2',
      location: 'Location 2',
      latitude: 78.912,
      longitude: -34.567,
      elevation: 2000,
      type: 'Shield volcano',
      activity: [
        {
            VEI: 5,
            activityType: "Type 3",
            activityStart: '2021-01-01',
            activityEnd: '2021-04-02',
        },
        {
            VEI: 7,
            activityType: "Type 4",
            activityStart: '2020-02-06',
            activityEnd: '2021-07-02',
        }
      ]
    }
    // Add more mock volcano data as needed
  ];