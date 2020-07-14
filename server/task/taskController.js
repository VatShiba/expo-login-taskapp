const Task = require('./taskModel')

exports.createTask = function (req, res, next) {
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    })
    task.save(function (err, task) {
        if (err) {
            next(err)
        }
        res.json({
            message: "Task created",
            task: task
        })
    })
}

exports.getAllTask = function (req, res, next) {
    Task.find({}).sort('createdAt').lean().exec(function (err, tasks) {
        if (err) {
            next(err)
        }
        res.json(tasks)
    })
}

exports.getById = function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            next(err)
        }
        res.json(task)
    })
}

exports.updateTask = function (req, res, next) {
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, task) {
        if (err) {
            next(err)
        }
        res.json({
            message: "Update Success",
            task: task
        })
    })
}

exports.deleteTask = function (req, res, next) {
    Task.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            next(err)
        }
        res.json({
            message: 'Delete Success'
        })
    })
}