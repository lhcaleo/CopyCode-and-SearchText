// A javascript runs on the particular url
// content script send message to show page action
chrome.runtime.sendMessage({
    todo: "showPageAction"
});

alert("Hello");


$("p").hide();