'use strict';

// Read existing notes from localStorage
const getSavedNotes = () => {
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
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
};

// Remove a note from the list
const removeNote = (id) => {
    const note_index = notes.findIndex((note) => note.id == id);

    if(note_index > -1) 
    {
        notes.splice(note_index, 1);
    }
};

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

// Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited")
    {
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt)
            {
                return -1;
            }
            else if (a.updatedAt < b.updatedAt)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        });
    }
    else if (sortBy === "byCreated")
    {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt)
            {
                return -1;
            }
            else if (a.createdAt < b.createdAt)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        });
    }
    else if (sortBy === "alphabetical")
    {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase())
            {
                return -1;
            }
            else if (a.title.toLowerCase() > b.title.toLowerCase())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        });
    }
};

// Render application notes
const renderNotes = (notes, filters) => {
    const notes_element = document.querySelector("#notes")
    notes = sortNotes(notes, filters.sortBy);
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

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;