document.addEventListener("DOMContentLoaded", function () {
    const ambientToggle = document.getElementById("ambientToggle");
    const labelToggle = document.getElementById("labelToggle");

    // Load settings from storage
    chrome.storage.sync.get(["ambientMode", "showLabel"], (data) => {
        updateToggle(ambientToggle, data.ambientMode ?? false);
        updateToggle(labelToggle, data.showLabel ?? false);
    });

    function updateToggle(toggleElement, isActive) {
        toggleElement.setAttribute("data-active", isActive);
    }

    function toggleSetting(toggleElement, settingKey) {
        const isActive = toggleElement.getAttribute("data-active") === "true" ? false : true;
        chrome.storage.sync.set({ [settingKey]: isActive });
        updateToggle(toggleElement, isActive);
    }

    ambientToggle.addEventListener("click", () => toggleSetting(ambientToggle, "ambientMode"));
    labelToggle.addEventListener("click", () => toggleSetting(labelToggle, "showLabel"));
});
