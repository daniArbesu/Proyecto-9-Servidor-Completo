# REST API for Olympic Athletes and Games using Express and MongoDB

## Populate the seed

To populate the exercises seed run the command `npm run seed`. It will create a table `olympic-games-db` with a collection `athletes` and `games` in your MongoDB Atlas connection defined in your `.env` file.

## Start the server

To start the server run on your terminal `npm run start`

it will automatically connect to the MongoDB Atlas connection that you defined in the `.env` file and also to your cloudinary account that you also defined on the `.env`

## API Athletes

### Data Structure

The JSON Data that the API for /athletes is gonna return has the following format:

```json
{
  "_id": Type:ObjectId "serial",
  "name": Type:String "Athlete's name",
  "surname": Type:String "Athlete's surname",
  "bio": Type:String "Athlete's bio",
  "date_of_birth": Type:String "Athlete's date of birth format dd/mm/yyyy",
  "height": Type:Number "Athlete's height in cm",
  "weight": Type:Number "Athlete's weight in kg",
  "photo_url": Type:String "URL to the CDN network hosting athlete's picture",
  "games": Type:[ObjectId] "Game ids where the athlete won a medal"
}
```

### Athletes API Endpoints

All URLs are relative to _https://olympic-athletes-server.onrender.com/api/_

| HTTP request                               | Description                                                                                                                                         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET** /athletes/{athleteId}              | Get Athlete by id                                                                                                                                   |
| **GET** /athletes                          | Get All Athletes                                                                                                                                    |
| **GET** /athletes/populate/{athleteId}     | Get Athlete by id and populate it with olympic games info                                                                                           |
| **POST** /athletes                         | Create new Athlete using body params following the json structure. Picture upload it's also allowed. User authentification is needed (Bearer Token) |
| **PUT** /athletes/{athleteId}              | Update Athlete using body params. You can also change the athlete's picture by sending a file. User authentification is needed (Bearer Token).      |
| **PUT** /athletes/{athleteId}/update-games | Add or Delete game related to one Athlete using body params. User authentification is needed (Bearer Token)                                         |
| **DELETE** /athletes/{athleteId}           | Delete Athlete by id. It will also delete the athlete's picture from the CDN. User authentification is needed (Bearer Token)                        |

## API Games

### Data Structure

The JSON Data that the API for /games is gonna return has the following format:

```json
{
  "_id": Type:ObjectId "serial",
  "city": Type:String "City where the olympics took place",
  "year": Type:Number "Year of the olympic game",
  "athletes": Type:[ObjectId] "Athlete ids that won a medal at that game"
}
```

### Games API Endpoints

All URIs are relative to _https://olympic-athletes-server.onrender.com/api/_

| HTTP request                           | Description                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **GET** /games/{gameId}                | Get Game by id                                                                                                    |
| **GET** /games/populate/{gameId}       | Get Game by id and populate it with athletes info                                                                 |
| **GET** /games                         | Get All Games                                                                                                     |
| **POST** /games                        | Create new Game using body params following the json structure. . User authentification is needed (Bearer Token). |
| **PUT** /games/{gameId}                | Update Game using body params. User authentification is needed (Bearer Token).                                    |
| **PUT** /games/{gameId}/update-athlete | Add or Delete athlete related to a Game using body params. User authentification is needed (Bearer Token).        |
| **DELETE** /games/{gameId}             | Delete Game by id. User authentification is needed (Bearer Token).                                                |

## API Auth

### Auth API Endpoints

All URIs are relative to _https://olympic-athletes-server.onrender.com/auth/_

| HTTP request       | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| **POST** /register | Register new User. Need valid email and valid password           |
| **POST** /login    | Get bearer token from a registered user. Need email and password |
| **POST** /avatar   | Upload an avatar for a userid using his bearer token             |
