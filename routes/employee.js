const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router
//10 upload.array('avatar[]'),