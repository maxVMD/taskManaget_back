const fs = require('fs');
const Note = require('../models/Note');

class NoteService {

    getUsersNotes(username) {
        const db = this.getDB();
        const user = this.getUser(db, username);
        if (user) {
            return user ? user.notes : 404;
        } else {
            return null;
        }
    }

    addNote(username, note) {
        const db = this.getDB();
        const user = this.getUser(db, username);
        const newNote = new Note();
        newNote.name = note.name;
        newNote.description = note.description;
        newNote.executionDate = note.executionDate;
        newNote.isPriority = note.isPriority;
        if (!user) return 404;

        if (!user.notes) {
            user.notes = [];
            user.notes.push(newNote);
            this.saveDB(db);
            return newNote;
        } else {
            user.notes.unshift(newNote);
            this.saveDB(db);
            return 200;
        }

    }

    updateNote(username, id, note) {
        const db = this.getDB();
        const user = this.getUser(db, username);

        const updatedNote = user.notes.find(el => +el.id === +id);

        if(!updatedNote) return 404;

        updatedNote.name = note.name;
        updatedNote.description = note.description;
        updatedNote.executionDate = note.executionDate;
        updatedNote.isPriority = note.isPriority;
        this.saveDB(db);
        return newNote;
    }

    deleteNote(username, id){
        const db = this.getDB();
        const user = this.getUser(db, username);

        const index = user.notes.findIndex(el => +el.id === +id);

        if(index === -1) return 404;

        user.notes.splice(index, 1);
        this.saveDB(db);
        return 200;

    }

    getUser(db, username) {
        return db.find(user => user && user.name === username);
    }

    getDB() {
        return JSON.parse(fs.readFileSync('./taskDB.json', 'utf8'));
    }

    saveDB(db) {
        fs.writeFileSync('./taskDB.json', JSON.stringify(db));
    }

}

module.exports = new NoteService();
