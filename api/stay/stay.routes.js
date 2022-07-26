const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addStay, getStays, deleteStay, getById} = require('./stay.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStays)
router.get('/:id',getById)
// router.post('/',  log, requireAuth, addStay)
// router.delete('/:id',  requireAuth, deleteStay)
// router.post('/',  log, addStay)
// router.delete('/:id', deleteStay)

module.exports = router