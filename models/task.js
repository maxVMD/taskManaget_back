class Task {
    id;
    name;
    createDate;
    description;
    isPriority;

    constructor(id = new Date().getTime(), name, createDate = new Date().toISOString(), description, isPriority = false) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.description = description;
        this.isPriority = isPriority;
    };
}

module.exports = Task;
