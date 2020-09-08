class Task {
    id;
    name;
    createDate;
    description;

    constructor(id = new Date().getTime(), name, createDate = new Date().toISOString(), description) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.description = description;
    };
}

module.exports = Task;
