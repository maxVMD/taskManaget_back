class User {
    name;
    age;
    login;
    email;
    password;
    projects;

    constructor(name, age, login, email, password, projects = []) {
        this.name = name;
        this.email = email;
        this.login = login;
        this.age = age;
        this.password = password;
        this.projects = projects;
    };
}

module.exports = User;
