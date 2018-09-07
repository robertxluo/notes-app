import { createNote } from "./notes.js";
import { setFilters } from "./filters.js";
import { renderNotes } from "./views.js";

// JSON.parse converts string to JS object
// JSON.stringify converts JS object to string

renderNotes();

document.querySelector("#create-note").addEventListener("click", (e) => {
    const note_id = createNote();
    location.assign(`/edit.html#${note_id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    });
    renderNotes();
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
    setFilters({
        sortBy: e.target.value
    });
    renderNotes();
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes")
    {
        renderNotes();
    }
});
