
// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem("notes");
    if (notesJSON !== null)
    {
        return JSON.parse(notesJSON);
    }
    else
    {
        return [];
    }
}

// Save the notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
};

// Remove a note from the list
const removeNote = function (id) {
    const note_index = notes.findIndex(function (note) {
        return note.id == id;
    });

    if(note_index > -1) 
    {
        notes.splice(note_index, 1);
    }
};

// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
    const note_element = document.createElement("div");
    const text_element = document.createElement("a");
    const button = document.createElement("button");

    // Setup the remove note button
    button.textContent = "x";
    note_element.appendChild(button);
    button.addEventListener("click", function() {
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    });

    // Setup the note title text
    if(note.title.length > 0)
    {
        text_element.setAttribute("href", `/edit.html#${note.id}`);
        text_element.textContent = note.title;
    }
    else
    {
        text_element.setAttribute("href", `/edit.html#${note.id}`);
        text_element.textContent = "Unnamed note";
    }

    note_element.appendChild(text_element);

    return note_element;
};

// Sort notes by one of three ways
const sortNotes = function (notes, sortBy) {
    if (sortBy === "byEdited")
    {
        return notes.sort(function (a, b) {
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
        return notes.sort(function (a, b) {
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
        return notes.sort(function (a, b) {
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
const renderNotes = function (notes, filters) {
    notes = sortNotes(notes, filters.sortBy);
    const filtered_notes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase()); 
    });

    document.querySelector("#notes").textContent = "";

    filtered_notes.forEach(function (note) {
        const note_element = generateNoteDOM(note);
        document.querySelector("#notes").appendChild(note_element);
    });
};

// Generate the last edited message
const generateLastEdited = function (timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`;
};