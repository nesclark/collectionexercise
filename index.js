const express = require('express')

const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const port = 3000

const dbService = require('./dbService')

const JsonResponseService = require('./JsonResponseService')

const ValidationService = require('./ValidationService')

const requestCount = require('../collectionexercise/Middleware/requestCount')

app.use(requestCount)

app.use(express.json())

const url = "mongodb://root:password@localhost:27017"

app.get('/crew', async (req, res) => {

    let queryFilter = {}

    if('status' in req.query) {
        queryFilter.status = req.query.status
    }

    if('seas_sailed' in req.query) {
        queryFilter.seas_sailed = req.query.seas_sailed
    }

    const collection = await dbService('pirates')
    const data = await collection.find(queryFilter).toArray()
    res.json(JsonResponseService('it worked', data))
})

app.get('/crew/rand', async (req, res) => {
    const collection = await dbService('pirates')
    const data = await collection.aggregate([{$sample: {size: 1}}]).toArray()
    res.json(JsonResponseService('it worked', data))
})

app.get('/crew/:id', async (req, res) => {

    let id = new ObjectId(req.params.id)

    const collection = await dbService('pirates')
    const data = await collection.find({_id: id}).toArray()
    res.json(JsonResponseService('it worked', data))
})

app.put('/crew', async (req, res) => {
    let id = new ObjectId(req.body.id)
    let {name, status, seas_sailed} = req.body
    const dataToBeValidated = [name, status, seas_sailed]
    const validatedData = ValidationService(dataToBeValidated)

    if (validatedData.length === 3) {
        const collection = await dbService('pirates')
        await collection.updateOne({_id: id}, {$set: {name:validatedData[0], status:validatedData[1], seas_sailed:validatedData[2]}})
        res.json(JsonResponseService('name and status changed matey'))
    } else {
        res.json(JsonResponseService('arrrrrr! invalid input'))
    }
})

app.put('/crew/favourite', async (req, res) => {
    let id = new ObjectId(req.body.id)

    const collection = await dbService('pirates')
    await collection.updateMany({}, {$set: {is_captain: false}})
    let data = await collection.updateOne({_id: id}, {$set: {is_captain: true}})
    console.log(data)
    if(data.modifiedCount !== null) {
        res.json(JsonResponseService('following a mutiny we have a new captain'))
    } else {
        res.json(JsonResponseService('back to the brig ye skurvy dog'))
    }

})

app.delete('/crew/:id', async (req, res) => {

    let id = new ObjectId(req.params.id)

    const collection = await dbService('pirates')
    await collection.deleteOne({_id: id})
    res.json(JsonResponseService('pirate walked the plank'))
})

app.post('/crew', async (req, res) => {
    let {name, weapon, demeanour, ailment, status, seas_sailed} = req.body
    const dataToBeValidated = [name, weapon, demeanour, ailment, status, seas_sailed]
    const validatedData = ValidationService(dataToBeValidated)

    if(validatedData.length === 6) {
        const collection = await dbService('pirates')
        await collection.insertOne({name:validatedData[0], weapon:validatedData[1], demeanour:validatedData[2], ailment:validatedData[3], status:validatedData[4], seas_sailed:validatedData[5]})
        res.json(JsonResponseService('it worked'))
    } else {
        res.json(JsonResponseService('it did not work'))
    }
})

app.listen(port)