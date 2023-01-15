const express = require('express')
const toolsRoute = require('./routes/v1/tools.route')
const app = express()
const port = 5000


app.get('/', (req, res)=>{
    res.send('Hello server')
})
app.use('/tools/api/v1', toolsRoute)

app.all('*', (req, res)=>{
    res.send('Route not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})