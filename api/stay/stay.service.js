const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
const asyncLocalStorage = require("../../services/als.service");

async function query(filterBy = {}) {
  try {
    console.log('hello hello', filterBy)
    const filterCriteria = _buildFilterCriteria(filterBy);

    const collection = await dbService.getCollection("stay");
    let stays = await collection.find(filterCriteria).limit(30).toArray();
    console.log(stays)
    return stays;
  } catch (err) {
    logger.error("cannot find stays", err);
    throw err;
  }
}
async function getById(id) {
  try {
    const collection = await dbService.getCollection("stay");
    let stay = await collection.findOne({ _id: ObjectId(id) });
    return stay;
  } catch (err) {
    logger.error("cannot find stay", err);
    throw err;
  }
}


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

function _buildFilterCriteria(
  filterBy = { destination: "", numOfGuests: 1, label: "" }
) {
  const { destination, numOfGuests, label} = filterBy;
  // console.log('labels')
  // console.log('building a criteria label',label)
  const criteria = {};
  if (numOfGuests) {
    criteria.capacity = { $gte: parseInt(numOfGuests)};
  }
  if (label) {
    criteria.labels = { $regex: label , $options: "i" };
    // console.log('criteria', criteria)
    return criteria
  }
  if (destination) {
    criteria['address.city'] = { $regex: destination , $options: "i" };
  }
  // if (labels) criteria.labels = { $in: labels }
  return criteria;
}

// {
//   const { destination, numOfGuests, labels } = filterBy;
//   const criteria = {};
//   if (numOfGuests) {
//     criteria.capacity = { $gte: parseInt(numOfGuests)};
//   }
//   if (labels.length) {
//     criteria.labels = { $in: labels }
//     return criteria
//   }
//   if (destination) {
//     criteria['address.city'] = { $regex: destination , $options: "i" };
//   }
//   return criteria;
// }

module.exports = {
  query,
  getById,
  // remove, //TODO: uncomment
  // add //TODO: uncomment
};
