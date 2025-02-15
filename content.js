let isMenuLoaded = false;
const settingsButton = document.querySelector('.ytp-settings-button');

const observer = new MutationObserver(() => {
    if (settingsButton) {
        if (!isMenuLoaded) {
            console.log("-----------Opening settings menu");
            // Menu loads in DOM only when settings is opened - open and close quickly
            settingsButton.click();
            settingsButton.click();
            isMenuLoaded = true;
        }
        let ambientMenuItem = Array.from(document.querySelectorAll('.ytp-menuitem')).find(el => el.querySelector('.ytp-menuitem-label')?.textContent === "Ambient mode");
        if (ambientMenuItem) {
            console.log("Ambient Mode option found.");
            let toggleState = ambientMenuItem.getAttribute("aria-checked");

            if (toggleState === "true") {
                ambientMenuItem.click();
                console.log("-----------Turning OFF!");
            } else {
                console.log("-----------Already OFF");
            }

            observer.disconnect();
            // Hide the ambient menu item for good
            ambientMenuItem.style.display = 'none';
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
