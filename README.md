# lira-node-app

This Project uses varius API calls with node to find info on movies, songs, and concerts. 

## Getting Started

Clone the repo. 

### Prerequisites

Be sure to run "npm i" to install the dependences. You will need to generate credentials for the Spotify API. See below steps.

Step One: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

Step Two: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

Step Three: On the next screen, scroll down to where you see your client id and client secret. 

Step Four: Create a .env file and copy and paste the below code replacing the values 'your_key_here' with your client id and client secret.

```
# Spotify API keys

SPOTIFY_ID=your_key_here
SPOTIFY_SECRET=your_key_here
```

You will also need an OMDB API Key. You can sign up for one [here.](http://www.omdbapi.com/apikey.aspx)


Finally a Bands In Town API Key [here.](https://www.artists.bandsintown.com/login)

## Running the tests

Below are the commands able to be ran. 


### node liri.js concert-this <artist/band name here>

This inables the user to search for upcoming shows for any artist they choose. 

See example: [concert](https://github.com/Coach-BWise/lira-node-app/blob/master/screenshots/concert-this.jpg)

### node liri.js spotify-this-song '<song name here>'

The user can get full details on a song of their choosing (results for "The Sign" are returned if no perameters are passed).

See example: [spotify](https://github.com/Coach-BWise/lira-node-app/blob/master/screenshots/spotify-this-song.jpg)

### node liri.js movie-this '<movie name here>'

The user can get full details on a movie of their choosing (results for "Mr. Nobody" are returned if no perameters are passed)

See example: [movie](https://github.com/Coach-BWise/lira-node-app/blob/master/screenshots/movie-this.jpg)

### node liri.js do-what-it-says

This will read the command of the random.txt file and run one of the above based on what is passed in this file. 

See example: [do it](https://github.com/Coach-BWise/lira-node-app/blob/master/screenshots/do-what-it-says.jpg)

## Built With

* [Node](https://nodejs.org/en/)
* [Axios](https://www.npmjs.com/package/axios)

## Author

**Bryan Wise** 
