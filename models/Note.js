class Note {
    id;
    name;
    createDate;
    description;
    isPriority;
    executionDate;

    constructor(id = new Date().getTime(), name, createDate = new Date().toISOString(), description, isPriority = false, executionDate) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.description = description;
        this.isPriority = isPriority;
        this.executionDate = executionDate;
    };
}

module.exports = Note;
