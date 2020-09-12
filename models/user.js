class User {
    name;
    age;
    login;
    email;
    password;
    projects;
    notes;

    constructor(name, age, login, email, password, projects = [], notes = []) {
        this.name = name;
        this.email = email;
        this.login = login;
        this.age = age;
        this.password = password;
        this.projects = projects;
        this.notes = notes;
    };
}

module.exports = User;
