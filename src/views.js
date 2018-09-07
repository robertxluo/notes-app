import moment from 'moment';
import { getFilters } from './filters.js';
import { sortNotes, getNotes } from './notes.js';

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const note_element = document.createElement("a");
    const text_element = document.createElement("p");
    const status_element = document.createElement("p");

    // Setup the note title text
    if (note.title.length > 0)
    {
        text_element.textContent = note.title;
    }
    else
    {
        text_element.textContent = "Unnamed note";
    }
    text_element.classList.add("list-item__title")
    note_element.appendChild(text_element);

    // Setup the link
    note_element.setAttribute("href", `/edit.html#${note.id}`);
    note_element.classList.add("list-item");

    // Setup the status message
    status_element.textContent = generateLastEdited(note.updatedAt)
    status_element.classList.add("list-item__subtitle")
    note_element.appendChild(status_element)
    return note_element;
};

// Render application notes
const renderNotes = () => {
    const notes_element = document.querySelector("#notes")
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy);
    const filtered_notes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notes_element.textContent = "";

    if (filtered_notes.length > 0)
    {
        filtered_notes.forEach((note) => {
            const note_element = generateNoteDOM(note);
            notes_element.appendChild(note_element);
        });        
    }
    else
    {
        const empty_message = document.createElement('p');
        empty_message.textContent = "No notes to show";
        empty_message.classList.add('empty-message');
        notes_element.appendChild(empty_message);
    }
};

const initializeEditPage = (note_id) => {
    const title_element = document.querySelector("#note-title")
    const body_element = document.querySelector("#note-body")
    const last_edited_element = document.querySelector("#last-edited");    
    const notes = getNotes();
    const note = notes.find((note) => note.id === note_id);
    
    if (!note)
    {
        location.assign("/index.html");
    }
    
    title_element.value = note.title;
    body_element.value = note.body;
    last_edited_element.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage };