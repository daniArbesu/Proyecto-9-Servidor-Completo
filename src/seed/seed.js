const seed = {
  athletes: [
    {
      _athlete_id: '1',
      bio: 'Example',
      date_of_birth: '14/04/1990',
      height: 164,
      name: 'Arianna',
      photo_url: '#',
      surname: 'Fontana',
      weight: 63,
      _game_id: ['4', '5', '6', '7']
    },
    {
      _athlete_id: '10',
      bio: 'Example',
      date_of_birth: '16/02/1969',
      height: 175,
      name: 'Fermín',
      photo_url: '#',
      surname: 'Cacho',
      weight: 65,
      _game_id: ['13', '14']
    },
    {
      _athlete_id: '11',
      bio: 'Example',
      date_of_birth: '15/04/1957',
      height: 165,
      name: 'Evelyn',
      photo_url: '#',
      surname: 'Ashford',
      weight: 52,
      _game_id: ['14', '15', '16']
    },
    {
      _athlete_id: '12',
      bio: 'Example',
      date_of_birth: '19/11/1966',
      height: 160,
      name: 'Yolanda',
      photo_url: '#',
      surname: 'Gail Devers-Roberts',
      weight: 55,
      _game_id: ['13', '14']
    },
    {
      _athlete_id: '13',
      bio: 'Example',
      date_of_birth: '16/05/1975',
      height: 154,
      name: 'Simon',
      photo_url: '#',
      surname: 'Whitfield',
      weight: 70,
      _game_id: ['11', '18']
    },
    {
      _athlete_id: '14',
      bio: 'Example',
      date_of_birth: '23/12/1975',
      height: 186,
      name: 'Robert',
      photo_url: '#',
      surname: 'Bartko',
      weight: 80,
      _game_id: ['11']
    },
    {
      _athlete_id: '15',
      bio: 'Example',
      date_of_birth: '19/09/1967',
      height: 193,
      name: 'Aleksandr',
      photo_url: '#',
      surname: 'Karelin',
      weight: 99,
      _game_id: ['11', '13', '14', '15']
    },
    {
      _athlete_id: '16',
      bio: 'Example',
      date_of_birth: '14/09/1974',
      height: 176,
      name: 'Hicham',
      photo_url: '#',
      surname: 'El Guerrouj',
      weight: 58,
      _game_id: ['9', '11']
    },
    {
      _athlete_id: '17',
      bio: 'Example',
      date_of_birth: '30/06/1985',
      height: 193,
      name: 'Michael',
      photo_url: '#',
      surname: 'Phelps',
      weight: 91,
      _game_id: ['2', '3', '8', '9']
    },
    {
      _athlete_id: '18',
      bio: 'Example',
      date_of_birth: '06/06/1972',
      height: 176,
      name: 'Noriaki',
      photo_url: '#',
      surname: 'Kasai',
      weight: 60,
      _game_id: ['5']
    },
    {
      _athlete_id: '2',
      bio: 'Example',
      date_of_birth: '10/02/1985',
      height: 169,
      name: 'Lidia',
      photo_url: '#',
      surname: 'Valentin Perez',
      weight: 75,
      _game_id: ['8', '3', '2', '13', '14']
    },
    {
      _athlete_id: '3',
      bio: 'Example',
      date_of_birth: '07/03/1994',
      height: 196,
      name: 'Chase',
      photo_url: '#',
      surname: 'Kalisz',
      weight: 86,
      _game_id: ['2']
    },
    {
      _athlete_id: '4',
      bio: 'Example',
      date_of_birth: '15/05/1987',
      height: 182,
      name: 'Andy',
      photo_url: '#',
      surname: 'Murray',
      weight: 83,
      _game_id: ['3', '2']
    },
    {
      _athlete_id: '5',
      bio: 'Example',
      date_of_birth: '21/08/1986',
      height: 196,
      name: 'Usain',
      photo_url: '#',
      surname: 'Bolt',
      weight: 95,
      _game_id: ['8', '3', '2']
    },
    {
      _athlete_id: '6',
      bio: 'Example',
      date_of_birth: '25/03/1983',
      height: 178,
      name: 'Javier',
      photo_url: '#',
      surname: 'Gomez Noya',
      weight: 69,
      _game_id: []
    },
    {
      _athlete_id: '7',
      bio: 'Example',
      date_of_birth: '10/07/1988',
      height: 176,
      name: 'Sarah',
      photo_url: '#',
      surname: 'Walker',
      weight: 74,
      _game_id: ['3']
    },
    {
      _athlete_id: '8',
      bio: 'Example',
      date_of_birth: '01/07/1961',
      height: 188,
      name: 'Carl',
      photo_url: '#',
      surname: 'Lewis',
      weight: 80,
      _game_id: ['13', '14', '15', '16']
    },
    {
      _athlete_id: '9',
      bio: 'Example',
      date_of_birth: '9/12/1966',
      height: 162,
      name: 'Joaquim',
      photo_url: '#',
      surname: 'Cruz',
      weight: 74,
      _game_id: ['15', '16']
    }
  ],
  games: [
    {
      city: 'Tokyo',
      _game_id: 1,
      year: 2020,
      _athlete_id: []
    },
    {
      city: 'Rio de Janeiro',
      _game_id: 2,
      year: 2016,
      _athlete_id: ['17', '2', '3', '4', '5']
    },
    {
      city: 'London',
      _game_id: 3,
      year: 2012,
      _athlete_id: ['17', '2', '4', '7']
    },
    {
      city: 'Pyeongchang',
      _game_id: 4,
      year: 2018,
      _athlete_id: ['1']
    },
    {
      city: 'Sochi',
      _game_id: 5,
      year: 2014,
      _athlete_id: ['1', '18']
    },
    {
      city: 'Vancouver',
      _game_id: 6,
      year: 2010,
      _athlete_id: ['1']
    },
    {
      city: 'Turin',
      _game_id: 7,
      year: 2006,
      _athlete_id: ['1']
    },
    {
      city: 'Beijing',
      _game_id: 8,
      year: 2008,
      _athlete_id: ['13', '17', '2', '5']
    },
    {
      city: 'Athens',
      _game_id: 9,
      year: 2004,
      _athlete_id: ['16', '17']
    },
    {
      city: 'Salt Lake City',
      _game_id: 10,
      year: 2002,
      _athlete_id: []
    },
    {
      city: 'Sydney',
      _game_id: 11,
      year: 2000,
      _athlete_id: ['13', '14', '15', '16']
    },
    {
      city: 'Nagano',
      _game_id: 12,
      year: 1998,
      _athlete_id: []
    },
    {
      city: 'Atlanta',
      _game_id: 13,
      year: 1996,
      _athlete_id: ['10', '12', '15', '8']
    },
    {
      city: 'Barcelona',
      _game_id: 14,
      year: 1992,
      _athlete_id: ['10', '11', '12', '15', '8']
    },
    {
      city: 'Seoul',
      _game_id: 15,
      year: 1988,
      _athlete_id: ['11', '15', '8', '9']
    },
    {
      city: 'Los Angeles',
      _game_id: 16,
      year: 1984,
      _athlete_id: ['11', '8', '9']
    }
  ]
};

export default seed;
