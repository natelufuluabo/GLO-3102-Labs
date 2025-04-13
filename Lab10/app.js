const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_URI)
.then(result => { console.log('connected to MongoDB')})
.catch(error => console.error(error))

const User = mongoose.model('User', new mongoose.Schema({}));

const taskSchema = new mongoose.Schema({ name: String, owner_id: String })
taskSchema.methods.toJSON = function() {
    const task = this
    const taskObject = { id: task._id, name: task.name }
    return taskObject
}
const Task = mongoose.model('Task', taskSchema)

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(400).send({
            errorCode: 'PARSE_ERROR',
            message: 'Arguments could not be parsed, make sure request is valid.'
        });
    } else {
        return res.status(500).send('Something broke server-side.');
    }
});

app.get('/', function(req, res) {
    res.send('Welcome to Lab 10 API.');
});

app.post('/users', async function(req, res) {
    try {
        const user = await User.insertOne();
        return res.status(200).send(JSON.stringify({'id': user._id}));
    } catch (error) {
        return res.status(500).send('Something broke server-side.');
    }
});

app.get('/:userId/tasks', function(req, res) {
    const userId = req.params.userId;

    ensureUserExist(userId, res, async function() {
        try {
            const tasks = await Task.find({ owner_id: userId })
            return res.status(200).send(JSON.stringify({'tasks': tasks}));
        } catch (error) {
            return res.status(500).send('Something broke server-side.');
        }
    });
});

app.post('/:userId/tasks', function(req, res) {
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        ensureValidTask(req.body, res, async function() {
            try {
                const newTask = await Task.insertOne({ name: req.body.name, owner_id: userId });
                return res.status(200).send(JSON.stringify(newTask));
            } catch (error) {
                return res.status(500).send('Something broke server-side.');
            }
        });
    });

});

app.put('/:userId/tasks/:taskId', function(req, res) {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        ensureValidTask(req.body, res, async function() {
            try {
                const task = await Task.findByIdAndUpdate(taskId, { name: req.body.name, owner_id: userId }, { new: true })
                if (!task) return res.status(400).send(`Task with id ${taskId} doesn't exist.`);
                return res.status(200).send(JSON.stringify(task));
            } catch (error) {
                return res.status(500).send('Something broke server-side.');
            }
        });
    });
});

app.delete('/:userId/tasks/:taskId', function(req, res) {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    ensureUserExist(userId, res, async function() {
        try {
            const task = await Task.findByIdAndDelete(taskId)
            if (!task) return res.status(400).send(`Task with id ${taskId} doesn't exist.`);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).send('Something broke server-side.');
        }
    });
});

app.listen(port, function() {
    console.log('Server listening.')
});

function ensureValidTask(task, res, callback) {
    if (task.name === undefined || task.name === '') {
        return res.status(400).send('Task definition is invalid.');
    }

    callback();
}

async function ensureUserExist(userId, res, callback) {
    try {
        const user = await User.findById(userId)
        if (!user) return res.status(400).send(`User with id ${userId} doesn't exist.`);
        callback();
    } catch (error) {
        return res.status(500).send('Something broke server-side.');
    }
}

