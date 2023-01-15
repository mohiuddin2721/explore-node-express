const express = require('express')
const toolsRoute = require('./routes/v1/tools.route')
const limiter = require('./middleware/limit')
const app = express()
const port = 5000

// app.use(limiter)
app.get('/', (req, res)=>{
    res.send('Hello server')
})
// app.use(viewCount)

app.use('/tools/api/v1', toolsRoute)


app.all('*', (req, res)=>{
    res.send('Route not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})