chrome.tabs.onCreated.addListener(function(newTab) {
    chrome.tabs.query({windowId: newTab.windowId}).then(tabs => {
        let duplicateTab = null;
        tabs.forEach(otherTab => {
            if (otherTab.id !== newTab.id && otherTab.url === newTab.url) {
                duplicateTab = otherTab;
            }
        });
        if (duplicateTab) {
            chrome.tabs.update(duplicateTab.id, {"selected": true});
            chrome.tabs.remove(newTab.id);
        }
    });
});

