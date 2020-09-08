class Project {
    id;
    name;
    createDate;
    tasks;

    constructor(id = new Date().getTime(), name, createDate = new Date().toISOString(), tasks = []) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.tasks = tasks;
    };
}

module.exports = Project;
