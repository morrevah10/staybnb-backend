const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const filterCriteria =  _buildFilterCriteria(filterBy)

        const collection = await dbService.getCollection('stay')
        // console.log('collection', collection)
        let stays = await collection.find(filterCriteria).toArray()
        // let stays = await collection.find().toArray()
        // console.log('stays', stays)
        return stays
      } catch (err) {
        logger.error('cannot find stays', err)
        throw err
      }
    }
async function getById(id) {
    try {
        console.log('id', id)
        const collection = await dbService.getCollection('stay')
        // console.log('collection', collection)
        let stay = await collection.findOne({"_id":ObjectId(id)})//FIXME: 
        console.log('stay', stay)
        // let stays = await collection.find().toArray()
        // console.log('stays', stays)
        return stay
      } catch (err) {
        logger.error('cannot find stay', err)
        throw err
      }
    }


  
    //FIXME: delete after query is working
        // const stays = await collection.find(criteria).toArray()
    //     var stays = await collection.aggregate([
    //         {
    //             $match: criteria
    //         },
    //         {
    //             $lookup:
    //             {
    //                 localField: 'byUserId',
    //                 from: 'user',
    //                 foreignField: '_id',
    //                 as: 'byUser'
    //             }
    //         },
    //         {
    //             $unwind: '$byUser'
    //         },
    //         {
    //             $lookup:
    //             {
    //                 localField: 'aboutUserId',
    //                 from: 'user',
    //                 foreignField: '_id',
    //                 as: 'aboutUser'
    //             }
    //         },
    //         {
    //             $unwind: '$aboutUser'
    //         }
    //     ]).toArray()
    //     stays = stays.map(stay => {
    //         stay.byUser = { _id: stay.byUser._id, fullname: stay.byUser.fullname }
    //         stay.aboutUser = { _id: stay.aboutUser._id, fullname: stay.aboutUser.fullname }
    //         delete stay.byUserId
    //         delete stay.aboutUserId
    //         return stay
    //     })

    //     return stays
    // } catch (err) {
    //     logger.error('cannot find stays', err)
    //     throw err
    // }

// }

//TODO: Uncomment when remove is ready
// async function remove(stayId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { loggedinUser } = store
//         const collection = await dbService.getCollection('stay')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(stayId) }
//         if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
//         const {deletedCount} = await collection.deleteOne(criteria)
//         return deletedCount
//     } catch (err) {
//         logger.error(`cannot remove stay ${stayId}`, err)
//         throw err
//     }
// }

//TODO: uncomment when add is ready
// async function add(stay) {
//     try {
//         const stayToAdd = {
//             byUserId: ObjectId(stay.byUserId),
//             aboutUserId: ObjectId(stay.aboutUserId),
//             txt: stay.txt
//         }
//         const collection = await dbService.getCollection('stay')
//         await collection.insertOne(stayToAdd)
//         return stayToAdd
//     } catch (err) {
//         logger.error('cannot insert stay', err)
//         throw err
//     }
// }


function _buildFilterCriteria(filterBy = { destination: '', numOfBeds: 1, labels: ''}) {
    const { destination, numOfBeds, labels } = filterBy
    const criteria = {}
    if (numOfBeds) {
      criteria.capacity = { $gte: numOfBeds }
    }
    if (destination) {
      criteria.address.city = { $regex: destination, $options: 'i' }
    //   criteria.address.country = { $regex: destination, $options: 'i' }
    }
    // if (labels) criteria.labels = { $in: labels }
    console.log('filterBy', filterBy)
    console.log('criteria', criteria)
    return criteria
  }
  

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
//     return criteria
// }

module.exports = {
    query,
    getById
    // remove, //TODO: uncomment
    // add //TODO: uncomment
}


