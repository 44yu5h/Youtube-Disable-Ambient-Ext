document.addEventListener("DOMContentLoaded", function () {
    const ambientToggle = document.getElementById("ambientToggle");
    const labelToggle = document.getElementById("labelToggle");

    // Load settings from storage
    chrome.storage.sync.get(["ambientMode", "hideMenuItem"], (data) => {
        updateToggle(ambientToggle, data.ambientMode ?? false);
        updateToggle(labelToggle, data.hideMenuItem ?? false);
    });

    function updateToggle(toggleElement, isActive) {
        toggleElement.setAttribute("data-active", isActive);
        const slider = toggleElement.querySelector(".slider");
        if (toggleElement.id === "ambientToggle") {
            isActive = !isActive; // Value correction cuz I wanted the toggle opposite in the UI.
        }                         // for all the toggles right side is the active state/true.
        slider.style.transform = isActive ? "translateX(70px)" : "translateX(0)";
    }

    function toggleSetting(toggleElement, settingKey) {
        const isActive = toggleElement.getAttribute("data-active") === "true" ? false : true;
        chrome.storage.sync.set({ [settingKey]: isActive });
        updateToggle(toggleElement, isActive);
    }

    ambientToggle.addEventListener("click", () => toggleSetting(ambientToggle, "ambientMode"));
    labelToggle.addEventListener("click", () => toggleSetting(labelToggle, "hideMenuItem"));
});
