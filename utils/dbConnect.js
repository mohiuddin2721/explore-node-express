const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI; // It doesn't work
const connectionString = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let dbConnection;
module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("tools");
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },
    getDb: function () {
        return dbConnection;
    },
};

// if can't connect to mongodb using above code, You should try with bellow code .........
// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://127.0.0.1:27017'

// const dbName = 'tools'
// const dbConnect = () => {
//     let db;
//     MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//         if (err) return console.log(err)

//         // Storing a reference to the database so you can use it later
//         db = client.db(dbName)
//         console.log(`Connected MongoDB: ${url}`)
//         console.log(`Database: ${dbName}`)
//     })
//     return db;
// }
// module.exports = dbConnect;

