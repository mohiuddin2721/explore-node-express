const express = require('express')
const toolsRoute = require('./routes/v1/tools.route')
const limiter = require('./middleware/limit')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = 5000

// app.use(cors());
// app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')

// app.use(limiter)
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
// app.use(viewCount)

app.use('/tools/api/v1', toolsRoute)


app.all('*', (req, res) => {
  res.send('Route not found')
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('unhandleRejection', (error) => {
  console.log(error.name, error.message)
  app.close(() => {
    process.exit(1);
  });
});