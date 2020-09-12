const User = require('../models/user');
const Project = require('../models/projects');
const Task = require('../models/task');
const fs = require('fs');
let DB;

const ProjectsService = {
    getUserByName,
    saveProject,
    saveUser,
    getUserProjects,
    getUserProjectTasks,
    updateProject,
    deleteProjectById,
    saveTask,
    updateTask,
    deleteTaskById
};


function getUserByName(collection, userName) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8'));
    console.log('db', db)

    if (db) {
        return db.find(user => user && user.name === userName);
    } else {
        return null;
    }
};


function saveUser(user) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    if (user) {
        db.push(user);
    }
    fs.writeFileSync('./taskDB.json', JSON.stringify(db));
};

// crud project

function saveProject(userName, project) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const projects = db.find(user => user.name === userName).projects;
    if (projects.some(pr => pr.name === project.name)) {
        return 'Такой проект уже существует';
    } else {
        const newProject = new Project();
        newProject.name = project.name;
        projects.push(newProject);
        fs.writeFileSync('./taskDB.json', JSON.stringify(db));
        return db
    }
};

function updateProject(userName, project) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const projects = db.find(user => user.name === userName).projects;
    const updatedProject = projects.find(project => project.id === +project.id);
    if (updatedProject) {
        updatedProject.name = project.name;
        fs.writeFileSync('./taskDB.json', JSON.stringify(db));
        return db;
    } else {
        return 'Project is not exist';
    }
}

function deleteProjectById(userName, id) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const projects = db.find(user => user.name === userName).projects;
    const index = projects.findIndex(project => project.id === +id);

    if (index === -1) return 404;

    projects.splice(index, 1);

    fs.writeFileSync('./taskDB.json', JSON.stringify(db));
    return 200;
}

function getUserProjects(userName) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const user = db.find(user => user.name === userName);
    return user ? user.projects : 404;
}

//task crud

function getUserProjectTasks(userName, projectId) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const projects = db.find(user => user.name === userName).projects;
    const project = projects.find(project => +project.id === +projectId);
    return project ? project.tasks : 404;
}


function saveTask(userName, projectId, task) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const projects = db.find(user => user.name === userName).projects;
    const project = projects.find(project => +project.id === +projectId);

    const newTask = new Task();
    newTask.name = task.name;
    newTask.description = task.description;

    if (!project) {
        return 404;
    }
    if (!project.tasks) {
        project.tasks = [];
        project.tasks.push(newTask);
    } else {
        project.tasks.unshift(newTask);
    }
    fs.writeFileSync('./taskDB.json', JSON.stringify(db));
    return 200;
}

function updateTask(userName, projectId, taskId, task) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const updatedTask = getTaskById(db, userName, projectId, taskId);

    if (!updatedTask) {
        return 404;
    }
    updatedTask.name = task.name;
    updatedTask.description = task.description;

    fs.writeFileSync('./taskDB.json', JSON.stringify(db));
    return 200;
}

function deleteTaskById(username, projectId, taskId) {
    const db = JSON.parse(fs.readFileSync('./taskDB.json', 'utf8')) || [];
    const index = getTaskIndex(db, username, projectId, taskId);
    const projects = db.find(user => user.name === username).projects;
    if (index === -1) {
        return 404;
    } else {
        const project = projects.find(el => +el.id === +projectId);
        project.tasks.splice(index, 1);
        fs.writeFileSync('./taskDB.json', JSON.stringify(db));
        return 200;
    }
}

function getTaskIndex(db, username, projectId, taskId) {
    const projects = db.find(user => user.name === username).projects;
    const project = projects.find(project => +project.id === +projectId);
    if (!project) {
        return null;
    } else {
        return project.tasks.findIndex(el => +el.id === +taskId);
    }
}

function getTaskById(db, username, projectId, taskId) {
    const projects = db.find(user => user.name === username).projects;
    const project = projects.find(project => +project.id === +projectId);
    if (!project) {
        return null;
    } else {
        return project.tasks.find(el => +el.id === +taskId);
    }

}


module.exports = ProjectsService;
