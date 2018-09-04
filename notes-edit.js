'use strict';

const title_element = document.querySelector("#note-title")
const body_element = document.querySelector("#note-body")
const remove_note_button = document.querySelector("#remove-note");
const last_edited_element = document.querySelector("#last-edited");

const note_id = location.hash.substring(1)
let notes = getSavedNotes();
let note = notes.find((note) => note.id === note_id);

if (!note)
{
    location.assign("/index.html");
}

title_element.value = note.title;
body_element.value = note.body;
last_edited_element.textContent = generateLastEdited(note.updatedAt);

title_element.addEventListener("input", (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    saveNotes(notes);
});

body_element.addEventListener("input", (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    last_edited_element.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

remove_note_button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign("index.html");
});

// Handles syncing (when multiple tabs open)
window.addEventListener("storage", (e) => {
    if (e.key === "notes")
    {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === note_id);

        if (!note)
        {
            location.assign("/index.html");
        }

        title_element.value = note.title;
        body_element.value = note.body;
        last_edited_element.textContent = generateLastEdited(note.updatedAt);
    }
});