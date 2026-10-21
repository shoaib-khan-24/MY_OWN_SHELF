document.querySelectorAll("[data-book-id]").forEach((button) => {
    button.addEventListener("click", async () => {
        const { bookId, bookTitle } = button.dataset;
        const confirmed = window.confirm(`Delete “${bookTitle}”? This cannot be undone.`);

        if (!confirmed) return;

        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = "Deleting…";

        try {
            const response = await fetch(`/delete-book/${bookId}`, {
                method: "DELETE",
                headers: { Accept: "application/json" }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Book could not be deleted.");
            }

            window.location.reload();
        } catch (error) {
            button.disabled = false;
            button.textContent = originalText;
            window.alert(error.message || "Book could not be deleted.");
        }
    });
});
