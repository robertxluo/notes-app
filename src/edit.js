import { initializeEditPage, generateLastEdited } from './views.js';
import { updateNote, removeNote } from './notes.js';

const title_element = document.querySelector("#note-title")
const body_element = document.querySelector("#note-body")
const remove_note_button = document.querySelector("#remove-note");
const last_edited_element = document.querySelector("#last-edited");
const note_id = location.hash.substring(1)

initializeEditPage(note_id);

title_element.addEventListener("input", (e) => {
    const note = updateNote(note_id, {
        title: e.target.value
    });
    last_edited_element.textContent = generateLastEdited(note.updatedAt);
});

body_element.addEventListener("input", (e) => {
    const note = updateNote(note_id, {
        body: e.target.value
    });
    last_edited_element.textContent = generateLastEdited(note.updatedAt);
});

remove_note_button.addEventListener("click", () => {
    removeNote(note_id);
    location.assign("index.html");
});

// Handles syncing (when multiple tabs open)
window.addEventListener("storage", (e) => {
    if (e.key === "notes")
    {
        initializeEditPage(note_id);
    }
});

