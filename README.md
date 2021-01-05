
# Task Manager API
 
### Авторизация  GET/ URL: localhost:3000/api/login
    response:  200
      `добро пожаловать Max`
      error 400
      
    model:
    class User {
        name: string;
        age: number;
        login: string;
        email: string;
        password: string;
        projects: Project[];
        notes: Note[];
    }

### Получить все Заметки по имкени пользователя GET/ URL: localhost:3000/api/users/${username}/notes 
    username  = имя ПОльзователя из поля name 
    response:  Array<Note>
         [
             {
               "id": 1599565637464,
               "name": "Новая заметка 1",
               "createDate": "2020-09-08T11:47:17.464Z",
               "description": "Описание заметки",
               "isPriority": true,
             },
             {
                "id": 1599565637464,
                "name": "Новая заметка 2",
                "createDate": "2020-09-08T11:47:17.464Z",
                "description": "Описание заметки",
                "isPriority": false,
                "executionDate": "2020-09-20T11:47:17.464Z",
             },
          ]
              
    model:
        class Note {
            constructor(
            public id: number, 
            public name: string,                - название заметки
            public createDate: string,          - дата создания заметки
            public description: string,         - описание заметки
            public isPriority: boollean,        - приоритетность заметки
            public executionDate: string,       - плановая дата исполнения заметки (опционально)
            ) {};
        }

### Добавление заметки POST/ URL: localhost:3000/api/users/${username}/notes
    username  = имя ПОльзователя из поля name 
    body: Note
        {
          "name": "Новый проектс",     -Обязательное поле
          "description": "Описание",     
          "isPriority": false,      
          "executionDate": "",      
        }

    response:  200 / 400 Ошибка
              
    model:
         class Note {
            constructor(
            public id: number, 
            public name: string,                - название заметки
            public createDate: string,          - дата создания заметки
            public description: string,         - описание заметки
            public isPriority: boollean,        - приоритетность заметки
            public executionDate: string,       - плановая дата исполнения заметки (опционально)
            ) {};
        }

### Редактировать заметку PUT/ URL: localhost:3000/api/users/${username}/notes/${id}
    username  = имя ПОльзователя из поля name 
    id - id заметки
    body: Note
            {
              "name": "Новый проектс",     -Обязательное поле
              "description": "Описание",     
              "isPriority": false,      
              "executionDate": "",      
            }

    response:  200 / 400 Ошибка
    model: class Note
### Удаление заметки DELETE/ URL: localhost:3000/api/users/${username}/notes/:id
    username  = имя ПОльзователя из поля name 
    id - id заметки
    response:  200 / 400 Ошибка
### Получить все проекты по имени пользователя GET/ URL: localhost:3000/api/users/${username}/projects 
    username  = имя ПОльзователя из поля name 
    response:  Array<Project>
          [
                {
                  "id": 1599510304088,
                  "name": " huhuhhhhhhh",
                  "createDate": "2020-09-07T20:25:04.088Z",
                  "tasks": [
                    {
                      "id": 1599565637464,
                      "name": "tasks1 ",
                      "createDate": "2020-09-08T11:47:17.464Z",
                      "description": "писание н333"
                    }
                  ]
                },
                {
                  "id": 1599510311206,
                  "name": "project2",
                  "createDate": "2020-09-07T20:25:11.206Z",
                  "tasks": []
                }
              ]
              
    model:
        class Project {
            constructor(
            public id: number, 
            public name: string, 
            public createDate: string, 
            public tasks: Arrays<Task>
            ) {};
        }
### Создать новый проект POST/ URL: localhost:3000/api/users/${username}/projects 
    username  = имя ПОльзователя из поля name 
    body: Project
        {
          "name": "Новый проектс",     -Обязательное поле
        }

    response:  200
        {
          "id": 1599510311206,
          "name": "project2",
          "createDate": "2020-09-07T20:25:11.206Z",
          "tasks": []
        }
        
        400 Ошибка
              
    model:
        class Project {
            constructor(
            public id: number, 
            public name: string, 
            public createDate: string, 
            public tasks: Arrays<Task>
            ) {};
        }
#

### Редактировать проект PUT/ URL: localhost:3000/api/users/${username}/projects 
    username  = имя ПОльзователя из поля name 
    body: Project
        {
          "id": 1599510311206,
          "name": "project2",
          "createDate": "2020-09-07T20:25:11.206Z",
          "tasks": []
        }

    response:  200
        {
          "id": 1599510311206,
          "name": "project2",
          "createDate": "2020-09-07T20:25:11.206Z",
          "tasks": []
        }
        
        400 Ошибка
              
    model:
        class Project {
            constructor(
            public id: number, 
            public name: string, 
            public createDate: string, 
            public tasks: Arrays<Task>
            ) {};
        }
#

### Удалить проект DELETE/ URL: localhost:3000/api/users/${username}/projects/${id} 
    username  = имя ПОльзователя из поля name 
    id  =  id проекта 

    response:  200 success
        
               400 Ошибка

#


### Получить все задачи по id проекта GET/ URL: localhost:3000/api/${username}/projects/${id}/tasks 
    username  = имя ПОльзователя из поля name 
    id = id проекта
    body: Task
            {
              "name": "Задача",
              "description": "Описание "
            }
            
    response:  Task[]
          [
            {
                "id": 1599565637464,
                "name": "Задача 1",
                "createDate": "2020-09-08T11:47:17.464Z",
                "description": "Описание ",
                "isPriority": true,
            },
            {
                "id": 1599565637464,
                "name": "Задача 2",
                "createDate": "2020-09-08T11:47:17.464Z",
                "description": "Описание ",
                "isPriority": false,
            },
          ]
              
    model:
        class Task {
            id: number;
            name: string;
            createDate: string;
            description: string;
            isPriority: boolean;
        }       
#
### Создать задачу для проекта POST/ URL: localhost:3000/api/${username}/projects/${id}/tasks 
    username  = имя ПОльзователя из поля name 
    id = id проекта
    response:   200
        {
            "id": 1599565637464,
            "name": "Задача 1",
            "createDate": "2020-09-08T11:47:17.464Z",
            "description": "Описание ",
            "isPriority": true,
        },
              
#
### Редактировать задачу для проекта PUT/ URL: localhost:3000/api/${username}/projects/${idProject}/tasks/${taskId}
    username  = имя ПОльзователя из поля name 
    idProject = id проекта
    taskId = id задачи
     body: Task
            {
                "id": 1599565637464,
                "name": "Задача 1",
                "createDate": "2020-09-08T11:47:17.464Z",
                "description": "Описание ",
                "isPriority": true,
            }
                
    response:   200
        {
            "id": 1599565637464,
            "name": "Задача 1",
            "createDate": "2020-09-08T11:47:17.464Z",
            "description": "Описание ",
            "isPriority": true,
        },
              
#
### Удалить задачу DELETE/ URL: localhost:3000/api/${username}/projects/${idProject}/tasks/${taskId} 
    username  = имя ПОльзователя из поля name 
    idProject  =  id проекта 
    taskId  =  id задачи 

    response:  200 success
        
               400 Ошибка

#
