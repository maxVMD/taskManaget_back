const User = require('./models/user');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const projectsService = require('./routes/projects');
const noteService = require('./services/note.service');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);

// app.use(function (req, res, next) {
//
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//     next();
// });


app.post('/api/login', jsonParser, (request, response) => {
    if (!request.body) return response.sendStatus(400);
    const user = projectsService.getUserByName(request.body.name);

    if (user) {
        response.send(`добро пожаловать ${user.name}`);
    } else {
        if (request.body && !request.body.name) {
            return response.sendStatus(400);
        }
        projectsService.saveUser(new User(request.body.name, request.body.age, request.body.login, request.body.email, request.body.password));
        response.send(`Новый пользователь ${request.body.name}`);
    }

});

// CRUD Note
app.get('/api/users/:username/notes', (request, response) => {
    let username = request.params['username'];
    const notes = noteService.getUsersNotes(username);
    response.json(resp);
});

app.post('/api/users/:username/notes', (request, response) => {
    let username = request.params['username'];
    const resp = noteService.addNote(username, request.body);
    response.json(resp);

});

app.put('/api/users/:username/notes/:id', (request, response) => {
    let username = request.params['username'];
    let idNote = request.params['id'];
    const resp = noteService.updateNote(username, idNote, request.body);
    response.json(resp);
});

app.delete('/api/users/:username/notes/:id', (request, response) => {
    let username = request.params['username'];
    let idNote = request.params['id'];
    const resp = noteService.deleteNote(username, idNote);
    response.json(resp);
});


// CRUD projects
app.get('/api/users/:username/projects', (request, response) => {
    let username = request.params['username'];
    const projects = projectsService.getUserProjects(username);
    if (projects === 404) {
        response.sendStatus(404);
    } else {
        response.json(projects);
    }
});


app.post('/api/users/:username/projects', jsonParser, (request, response) => {
    if (!request.body) return response.sendStatus(400);
    let username = request.params['username'];
    const resp = projectsService.saveProject(username, request.body);
    response.json(resp);
});

app.put('/api/users/:username/projects', jsonParser, (request, response) => {
    if (!request.body) return response.sendStatus(400);
    let username = request.params['username'];
    const resp = projectsService.updateProject(username, request.body);
    response.json(resp);
});

app.delete('/api/users/:username/projects/:id', jsonParser, (request, response) => {
    if (!request.body) return response.sendStatus(400);
    let username = request.params['username'];
    let idProject = request.params['id'];
    const resp = projectsService.deleteProjectById(username, idProject);
    response.json(resp);
});


// CRUD tasks
app.get('/api/:username/projects/:id/tasks', (request, response) => {
    let username = request.params['username'];
    let projectId = request.params['id'];
    const tasks = projectsService.getUserProjectTasks(username, projectId);
    if (tasks === 404) {
        response.sendStatus(404);
    } else {
        response.json(tasks);
    }
});
// save task
app.post('/api/:username/projects/:id/tasks', (request, response) => {
    let username = request.params['username'];
    let projectId = request.params['id'];
    const resp = projectsService.saveTask(username, projectId, request.body);
    response.sendStatus(resp);
});
// update
app.put('/api/:username/projects/:id/tasks/:taskId', (request, response) => {
    let username = request.params['username'];
    let projectId = request.params['id'];
    let taskId = request.params['taskId'];
    const resp = projectsService.updateTask(username, projectId, taskId, request.body);
    response.sendStatus(resp);
});

app.delete('/api/:username/projects/:id/tasks/:taskId', (request, response) => {
    let username = request.params['username'];
    let projectId = request.params['id'];
    let taskId = request.params['taskId'];
    const resp = projectsService.deleteTaskById(username, projectId, taskId);
    response.sendStatus(resp);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
