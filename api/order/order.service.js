const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query() {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const order = await collection.find().sort({ date: -1 }).toArray()
        // console.log(order)
        // const reviews = await collection.find(criteria).toArray()
        return order
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }

}



async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
//     return criteria
// }

module.exports = {
    query,
    // remove,
    add
}


