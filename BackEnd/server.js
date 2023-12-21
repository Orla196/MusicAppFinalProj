const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connecting to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://cluster0.bslyxsp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DataBase23', //database name
    user: 'g00397035',  //username
    pass: 'DataRep23' //MongoDB password
  });
}
//defining MondoDB schema and Model for Songs
const songSchema = new mongoose.Schema({
  artist: String,
  songTitle: String,
  albumCover: String,
  duration: String,
  youtubeLink: String
});

const songModel = mongoose.model('Song', songSchema);

//Updating existing song by ID
app.put('/api/song/:id', async (req, res) => {
  console.log("Update: " + req.params.id);

  let song = await songModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(song);
});

//Deleting an existing song by ID
app.delete('/api/song/:id', async (req, res) => {
  console.log("Delete: " + req.params.id);
  let song = await songModel.findByIdAndDelete(req.params.id);
  res.send(song);
});

//create a new song
app.post('/api/song', (req, res) => {
  console.log(req.body);

  songModel.create({
    artist: req.body.artist,
    songTitle: req.body.songTitle,
    albumCover: req.body.albumCover,
    duration: req.body.duration,
    youtubeLink: req.body.youtubeLink
  })
    .then(() => { res.send("Song Created"); })
    .catch(() => { res.send("Song NOT Created"); });
});

//retrieves a list of songs
app.get('/api/songs', async (req, res) => {
  try {
    //extracts the artists parameter from the query string
    const { artist } = req.query;

    let songs;

    //check if an artist parameter is provided in the query
    if (artist) {
      songs = await songModel.find({ artist });

      //checks if any song is found for specific artist
      if (songs.length === 0) {
        return res.status(404).json({ message: 'No songs found for the specified artist.' });
      }
    } else {
      //if no parameter entered return all songs
      songs = await songModel.find({});
    }

    res.json(songs);
  } catch (error) {
    // Handle errors during the fetch operation
    console.error('Error fetching songs:', error);
    res.status(500).send('Internal Server Error');
  }
});

//retrieve a specific song by ID
app.get('/api/song/:id', async (req, res) => {
  console.log(req.params.id);

  let song = await songModel.findById(req.params.id);
  res.send(song);
});

//default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start the server
app.listen(port, () => {
  console.log('Server is listening on port ${port}');
});
