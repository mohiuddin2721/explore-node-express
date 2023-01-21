const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect")

module.exports.getAllTools = async (req, res, next) => {
    try {
        const db = getDb();
        const { limit, page } = req.query;
        // cursor => toArray(), forEach()
        const allTools = await db
            .collection('tools')
            .find()
            // .project({ name: 1 }) // project means projection
            .skip(+page * limit)
            .limit(+limit)
            .toArray();
        // res.send(allTools)
        res.status(200).json({ success: true, data: allTools })
    } catch (error) {
        next(error)
    }
    // res.send('tools found')
    // const {id, params, ip, query, body, header}= req;
    // console.log(`id: ${id}; params: ${params}; ip: ${ip}; query: ${query}; body: ${body}; header: ${header}; `)
    // console.log(req.originalUrl)
    // res.redirect('/admin')
    // res.send('Got found')

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
        res.send({ success: true, message: `Tool added with id: ${result.insertedId}` }) //better way
    } catch (error) {
        next(error)
    }

}

module.exports.getToolId = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        // to validate the id 
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Your id: (${id}) is not a valid id` })
        }
        const singleTool = await db.collection('tools').findOne({ _id: ObjectId(id) })
        // to validate the data
        if (!singleTool) {
            return res.status(400).json({ success: false, message: 'Could not find a tool with this id' })
        }
        res.status(200).json({ success: true, data: singleTool })
    } catch (error) {
        next(error)
    }
}
module.exports.updateTool = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        // to validate the id 
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Your id: (${id}) is not a valid id` })
        }
        const updateSingleTool = await db.collection('tools').updateOne({ _id: ObjectId(id) }, { $set: req.body })
        // to validate the modifiedCount
        if (!updateSingleTool.modifiedCount) {
            return res.status(400).json({ success: false, message: 'Could not update the tool' })
        }
        res.status(200).json({ success: true, message: 'Successfully updated the tool' })
    } catch (error) {
        next(error)
    }
}
module.exports.deleteTool = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        // to validate the id 
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Your id: (${id}) is not valid` })
        }
        const deleteSingleTool = await db.collection('tools').deleteOne({ _id: ObjectId(id) })
        // to validate the deletedCount
        if (!deleteSingleTool.deletedCount) {
            return res.status(400).json({ success: false, message: 'Could not delete the tool' })
        }
        res.status(200).json({ success: true, message: 'Successfully deleted the tool' })
    } catch (error) {
        next(error)
    }
}

// for testing 
module.exports.test = async (req, res, next) => {
    for (let i = 0; i < 100000; i++) {
        const db = getDb();
        db.collection('test').insertOne({ name: `test ${i}`, age: i });
    }
}

module.exports.testGet = async (req, res, next) => {
    const db = getDb();

    const result = await db.collection('test').find({age: 99999}).toArray();
    res.json(result)
}