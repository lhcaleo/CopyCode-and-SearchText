// Fired when a message is sent from either an extension process 
// (by runtime.sendMessage) or a content script (by tabs.sendMessage).
// @request -The incoming message sent by the calling script.
// @sender -MessageSender
// @sendResponse -Function to call (at most once) when you have a response. 
//                The argument should be any JSON-ifiable object.

// To ask chrome to retrieve all tabs so that we can show the icon
// Get the tab that is active and in current window 
// Show the page action by pageAction api
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "showPageAction") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});

// Create a menu item for searching on wikipedia
var menuItem = {
    "id": "search",
    "title": "Search selected text on",
    "contexts": ["selection"]
};
var menuItemWikipedia = {
    "parentId": "search",
    "id": "wikipedia",
    "title": "Search on Wikipedia",
    "contexts": ["selection"]
};
var menuItemBing = {
    "parentId": "search",
    "id": "bing",
    "title": "Search on Bing",
    "contexts": ["selection"],
};
var menuItemBaidu= {
    "parentId": "search",
    "id": "youtube",
    "title": "Search on YouTube",
    "contexts": ["selection"],
};
var menuItemSpeak = {
    "parentId": "search",
    "id": "speak",
    "title": "Speak selected text",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);
chrome.contextMenus.create(menuItemWikipedia);
chrome.contextMenus.create(menuItemBing);
chrome.contextMenus.create(menuItemBaidu);
chrome.contextMenus.create(menuItemSpeak);
// Any text you select, it's going to prepare it in a format
// that can be appended to a URL, Avoid bad title in searching
// [ and ] is replaced by %5B and %5D at URL encoding time.
function fixedEncodeURL (str){
    return encodeURI(str).replace(/%5B/g,'[').replace(/%5D/g, ']');
}
// Add listener for this menu item 
chrome.contextMenus.onClicked.addListener(function(onClickData){
    if(onClickData.menuItemId !== "speak" && onClickData.selectionText)
    {
        var add_url = fixedEncodeURL(onClickData.selectionText);
        switch(onClickData.menuItemId){
            case "wikipedia":
                var url = "https://en.wikipedia.org/wiki/" + add_url;
                break;
            case "bing":
                var url = "https://www.bing.com/search?q=" + add_url;
                break;
            case "youtube":
                var url = "https://www.youtube.com/results?search_query=" + add_url;
                break;
        }
        var createData = {
            "url": url,
            "top": 200,
            "left": 200,
            "width": parseInt(screen.availWidth/1.5),
            "height": parseInt(screen.availHeight/1.5)
        };
        chrome.windows.create(createData);
    }
    if(onClickData.menuItemId === "speak" && onClickData.selectionText)
    {
        chrome.tts.speak(onClickData.selectionText, {'rate':0.8});
    }
});
