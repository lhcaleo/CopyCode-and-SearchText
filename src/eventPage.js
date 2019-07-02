// Fired when a message is sent from either an extension process 
// (by runtime.sendMessage) or a content script (by tabs.sendMessage).
// @request -The incoming message sent by the calling script.
// @sender -MessageSender
// @sendResponse -Function to call (at most once) when you have a response. 
//                The argument should be any JSON-ifiable object.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "showPageAction") {
        // To ask chrome to retrieve all tabs so that we can show the icon
        // Get the tab that is active and in current window 
        // Show the page action by pageAction api
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
})
// $(function(){
//     $("#question-header").text("AAAA");
// });
