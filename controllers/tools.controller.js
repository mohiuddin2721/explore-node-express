module.exports.getAllTools = (req, res) => {
    // res.send('tools found')
    // const {id, params, ip, query, body, header}= req;
    // console.log(`id: ${id}; params: ${params}; ip: ${ip}; query: ${query}; body: ${body}; header: ${header}; `)
    // console.log(req.originalUrl)
    // res.redirect('/admin')
    res.send('Got found')

    // req and res have many method. We must need to explore all from express documentation
}

module.exports.saveATools = (req, res) => {
    res.send('tools post')
}

module.exports.getToolId = (req, res) => {
    res.send('get the id')
}