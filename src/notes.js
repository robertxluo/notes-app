import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");

    try 
    {
        return notesJSON ? JSON.parse(notesJSON) : [];
    }
    catch (e)
    {
        return [];
    }
};

// Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
};

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
    const note_id = uuidv4();
    const now = moment().valueOf();
    notes.push({
        id: note_id,
        title: '',
        body: '',
        createdAt: now,
        updatedAt: now
    });    
    saveNotes();
}

notes = loadNotes();

export { getNotes, createNote };