let isMenuLoaded = false;
const settingsButton = document.querySelector('.ytp-settings-button');
let ambientMode, hideMenuItem;

const observer = new MutationObserver(() => {
    if (settingsButton && !isMenuLoaded) {
        // Menu loads in DOM only when settings is opened/expanded: open and close quickly
        settingsButton.click();
        settingsButton.click();
        isMenuLoaded = true;
    }

    if (isMenuLoaded) {
        console.log('Menu loaded');
        const ambientMenuItem = Array.from(document.querySelectorAll('.ytp-menuitem[role="menuitemcheckbox"]')).find(el => el.querySelector('.ytp-menuitem-label')?.textContent === "Ambient mode");
        if (ambientMenuItem) {
            console.log('Ambient menu item found');
            observer.disconnect();
            const toggleState = ambientMenuItem.getAttribute("aria-checked") === "true";
            if (toggleState !== ambientMode) {
                console.log('Toggling ambient mode');
                ambientMenuItem.click();
            }
            if (hideMenuItem) {
                ambientMenuItem.style.display = 'none';
            }
        }
    }
});

chrome.storage.sync.get(["ambientMode", "hideMenuItem"], (data) => {
    ambientMode = data.ambientMode ?? true;
    hideMenuItem = data.hideMenuItem ?? false;
    observer.observe(document.body, { childList: true, subtree: true });
});
