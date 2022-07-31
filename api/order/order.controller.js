const orderService = require('./order.service')
const logger = require('../../services/logger.service')

// async function getOrders(req, res) {
//     try {
//         console.log('req', req.query)
        
//         const order = await orderService.query(req.query)
//         res.send(order)
//     } catch (err) {
//         logger.error('Cannot get orders', err)
//         res.status(500).send({ err: 'Failed to get orders' })
//     }
// }

async function getOrders(req, res) {
    try {
        const order = await orderService.query(req.query)
        res.send(order)
    } catch (err) {
        logger.error('Cannot get oeder', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) { 
    try {
        var order = req.body
        order = await orderService.add(order)
        res.send(order)

    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}


module.exports = {
   getOrders,
   addOrder,
}