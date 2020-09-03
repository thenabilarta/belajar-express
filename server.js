const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

const MONGODB_URI =
  'mongodb+srv://jaewon:jaewon@emaily.vz1zo.mongodb.net/emaily-dev?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

// // Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  email: String,
  password: String,
});

// // Model
const ApaanDah = mongoose.model('ApaanDah', BlogPostSchema);

// saving data to our mongo database
const data = {
  title: 'Abara kadabra',
  body: 'easy peasy',
};

// .save()

app.post('api/register', (req, res) => {
  const newApaanDah = new ApaanDah(req.body);

  newApaanDah.save((error) => {
    if (error) {
      console.log('Ada yang error gan');
    } else {
      console.log('Data udah ke save gan');
    }
  });
});

// Routes
// app.post('/', (req, res) => {
//   ApaanDah.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log('error gan');
//     });
// });

app.listen(PORT, () => {
  console.log('Server telah berjalan di port 5000');
});
