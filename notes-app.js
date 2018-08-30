let notes = getSavedNotes();

const filters = {
    searchText: "",
    sortBy: "byEdited"
};

// JSON.parse converts string to JS object
// JSON.stringify converts JS object to string

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", function (e) {
    const note_id = uuidv4();
    const now = moment().valueOf();
    notes.push({
        id: note_id,
        title: '',
        body: '',
        createdAt: now,
        updatedAt: now
    });
    
    saveNotes(notes);
    location.assign(`/edit.html#${note_id}`);
});

document.querySelector("#search-text").addEventListener("input", function (e) {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters);
});

window.addEventListener("storage", function(e) {
    if (e.key = "notes")
    {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
});