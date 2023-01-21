const { getDb } = require("../utils/dbConnect")

module.exports.getAllTools = (req, res) => {
    // res.send('tools found')
    // const {id, params, ip, query, body, header}= req;
    // console.log(`id: ${id}; params: ${params}; ip: ${ip}; query: ${query}; body: ${body}; header: ${header}; `)
    // console.log(req.originalUrl)
    // res.redirect('/admin')
    res.send('Got found')

    // req and res have many method. We must need to explore all from express documentation
}

module.exports.saveATools = async (req, res, next) => {
    try {
        const db = getDb();
        const tool = req.body;

        const result = await db.collection('tools').insertOne(tool);
        // console.log(result.insertedId)
        if (!result.insertedId) {
            return res.status(400).send({ status: false, error: 'Something went wrong' })
        }
        // res.send(`Tool added with id: ${result.insertedId}`)
        res.send({success: true, message: `Tool added with id: ${result.insertedId}`}) //better way
    } catch (error) {
        next(error)
    }

}

module.exports.getToolId = (req, res) => {
    res.send('get the id')
}