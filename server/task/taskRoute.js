const router = require('express').Router()
const controller = require('./taskController')

router.post('/create', controller.createTask)
router.get('/', controller.getAllTask)
router.get('/:id', controller.getById)
router.put('/:id/update', controller.updateTask)
router.delete('/:id/delete', controller.deleteTask)

module.exports = router