document.querySelectorAll("[data-note-id]").forEach((button) => {
    button.addEventListener("click", async () => {
        const confirmed = window.confirm("Delete this note? This cannot be undone.");
        if (!confirmed) return;

        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = "Deleting…";

        try {
            const response = await fetch(`/delete-note/${button.dataset.noteId}`, {
                method: "DELETE",
                headers: { Accept: "application/json" }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Note could not be deleted.");
            }

            window.location.reload();
        } catch (error) {
            button.disabled = false;
            button.textContent = originalText;
            window.alert(error.message || "Note could not be deleted.");
        }
    });
});
