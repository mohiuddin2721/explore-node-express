const express = require('express');
require('dotenv').config();
const port = 5000;
const app = express();
const toolsRoute = require('./routes/v1/tools.route');
const limiter = require('./middleware/limit');
const errorHandler = require('./middleware/errorHandler');
const { connectToServer } = require('./utils/dbConnect');

// app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } else {
    console.log(err)
  }
})

// app.use(limiter)
// app.use(viewCount)
app.get('/', (req, res) => {
  // res.send('Hello server')
  // res.sendFile(__dirname + '/public/text.html')
  res.render('home.ejs', {
    id: 2,
    user: {
      name: 'nodeJs'
    }
  })
})


app.use('/tools/api/v1', toolsRoute)

app.all('*', (req, res) => {
  res.send('Route not found')
})

app.use(errorHandler);


process.on('unhandleRejection', (error) => {
  console.log(error.name, error.message)
  app.close(() => {
    process.exit(1);
  });
});