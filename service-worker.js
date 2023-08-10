chrome.tabs.onUpdated.addListener(({ tabID, changeInfo, tab }) => {
    ['Chainguard Authentication', 'Sigstore Authentication'].forEach((title) => {
        chrome.tabs.query({
            title: title,
            url: "http://localhost:*/*"
        }).then((tabs) => {
            tabs.forEach((tab) => {
                chrome.storage.sync.get(
                    { timeToClose: '100' },
                    (items) => {
                        setTimeout(() => {
                            console.log(`closing tab ${tab.id} with title ${tab.title} and url ${tab.url}`);
                            chrome.tabs.remove(tab.id, () => {
                                chrome.storage.sync.get(["count"]).then((result) => {
                                    console.log("Value currently is " + result.count);
                                    let count = parseInt(result.count || 0) + 1;
                                    chrome.storage.sync.set({ count: count }).then(() => {
                                        console.log("Value is set to " + count);
                                        chrome.action.setBadgeText({ text: count.toString() });
                                        chrome.action.setBadgeBackgroundColor({ color: "#221F5C" });
                                    });
                                });
                            });
                        }, items.timeToClose);
                    }
                );
            });
        });
    });
});
