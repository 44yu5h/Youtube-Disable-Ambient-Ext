let ambientMode, hideMenuItem;

const observer = new MutationObserver(() => {
    // Query selectors dynamically to handle SPA navigation
    const videoSettingsButton = document.querySelector('.ytp-settings-button');
    const shortsMenuButton = document.querySelector('#menu-button yt-button-shape > button');
    const settingsButton = isVideo() ? videoSettingsButton : shortsMenuButton;
    
    if (settingsButton && !settingsButton.hasAttribute('ambient-mode-processed')) {
        settingsButton.setAttribute('ambient-mode-processed', 'true');
        // Menu loads in DOM only when settings is opened/expanded: open and close quickly
        settingsButton.click();
        settingsButton.click();
        
        setTimeout(() => {
            settingsButton.click();
            settingsButton.click();
            
            const videoAmbientMenuItem = Array.from(document.querySelectorAll('.ytp-menuitem[role="menuitemcheckbox"]'))
                .find(el => el.querySelector('.ytp-menuitem-label')?.textContent === "Ambient mode");
            const shortsAmbientMenuItem = document.querySelector('ytd-toggle-menu-service-item-renderer tp-yt-paper-toggle-button');
            const ambientMenuItem = isVideo() ? videoAmbientMenuItem : shortsAmbientMenuItem;
            
            if (ambientMenuItem) {
                // Check toggle state correctly for both types
                const toggleState = isVideo() 
                    ? ambientMenuItem.getAttribute("aria-checked") === "true"
                    : ambientMenuItem.hasAttribute("checked");
                
                if (toggleState !== ambientMode) {
                    ambientMenuItem.click();
                }
                if (hideMenuItem) {
                    ambientMenuItem.style.display = 'none';
                }
            }
        }, 1000);
    }
});

chrome.storage.sync.get(["ambientMode", "hideMenuItem"], (data) => {
    ambientMode = data.ambientMode ?? false;
    hideMenuItem = data.hideMenuItem ?? false;
    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(() => observer.disconnect(), 30000);
});

function isVideo() {
    const path = window.location.pathname;
    return path.startsWith('/watch') ? true : path.startsWith('/shorts/') ? false : null;
}
