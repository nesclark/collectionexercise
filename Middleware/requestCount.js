const dbService = require('../dbService')

const requestCount = async (req,res,next) => {

    const collection = await dbService('count')
    let data = await collection.findOne({})

    let count = data.count+1

    await collection.updateOne(data, {$set: {count:count}})
    next()
}

module.exports = requestCount