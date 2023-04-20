const {MongoClient} = require("mongodb");

const url = "mongodb://root:password@localhost:27017"
const dbService = async (details) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('crew')
    const collection = db.collection(details)
    return collection
}

module.exports = dbService


