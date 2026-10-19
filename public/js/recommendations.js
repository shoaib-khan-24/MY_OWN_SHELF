const recommendButton = document.querySelector("#recommend-button");
const assistantPanel = document.querySelector("#assistant-panel");
const recommendationStatus = document.querySelector("#recommendation-status");
const recommendationResult = document.querySelector("#recommendation-result");
const hideRecommendationsButton = document.querySelector("#hide-recommendations");

if (recommendButton) {
    recommendButton.addEventListener("click", async () => {
        recommendButton.disabled = true;
        assistantPanel.hidden = false;

        recommendationStatus.textContent = "Thinking about your shelf…";
        recommendationResult.textContent = "";

        try {
            const response = await fetch("/recommendations", {
                method: "POST",
                headers: {
                    Accept: "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not get recommendations.");
            }

            recommendationStatus.textContent = "Here are some ideas for your next read:";
            recommendationResult.textContent = data.recommendation;
        } catch (error) {
            recommendationStatus.textContent =
                error.message || "Could not generate recommendations.";
        } finally {
            recommendButton.disabled = false;
        }
    });
}

hideRecommendationsButton?.addEventListener("click", () => {
    assistantPanel.hidden = true;
    recommendationResult.replaceChildren();
});