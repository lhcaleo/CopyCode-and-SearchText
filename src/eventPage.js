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
    "id": "wikipedia",
    "title": "Search on Wikipedia",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);
// Any text you select, it's going to prepare it in a format
// that can be appended to a URL, Avoid bad title in searching
// [ and ] is replaced by %5B and %5D at URL encoding time.
function fixedEncodeURL (str){
    return encodeURI(str).replace(/%5B/g,'[').replace(/%5D/g, ']');
}
// Add listener for this menu item 
chrome.contextMenus.onClicked.addListener(function(onClickData){
    if(onClickData.menuItemId === "wikipedia" && onClickData.selectionText)
    {
        var wikiURL = "https://en.wikipedia.org/wiki/" + fixedEncodeURL(onClickData.selectionText);
        var createData = {
            "url": wikiURL,
            "top": 10,
            "left": 10,
            "width": parseInt(screen.availWidth/2),
            "height": parseInt(screen.availHeight/1.7)
        };
        chrome.windows.create(createData);
    }
});