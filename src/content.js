 // include bootstrap
 var script = document.createElement("script");
 script.src = "bootstrap.bundle.min.js";
 document.head.appendChild(script);
 
// A javascript runs on the particular url
// content script send message to show page action
chrome.runtime.sendMessage({
    todo: "showPageAction"
});

// Select all the code blocks, and add button for each of them
var block = document.querySelectorAll("pre > code");
block.forEach(addButton);

function addButton(block){
    var btn = document.createElement("button");
    btn.type = "button"; //The button is a clickable button
    btn.className = "copyButton";
    btn.setAttribute("data-toggle","tooltip");
    btn.setAttribute("data-placement","top")
    btn.setAttribute("title", "Copy to clipboard");
    btn.innerHTML = "Copy";
    var pre = block.parentNode;
    pre.parentNode.insertBefore(btn, pre);
}

// CSS styling for the button
var css = {
        'font-size': '13px',
        display: 'block',
        'z-index': '5',
        'margin-left': 'auto',
        padding: '0.25rem 0.5rem',
        color: '#393a3d',
        'background-color': 'transparent',
        'border-radius': '8px',
        border: 'none',
        'box-shadow': 'none'
}
var hoverCSS = {
    color: 'white',
    'background-color':'#007bff',
    cursor: 'pointer'
}
$('.copyButton').css(css);

// Activate tooltip of the button
$(function() {
    $('.copyButton').tooltip();
});
// Define CSS of button by event
$('.copyButton').mouseover(function(event){
    $(event.target).css(hoverCSS);
});
$('.copyButton').mouseout(function(){
    $('.copyButton').css(css);
});

//TODO:
/**
 * 1. Function copy to clipboard
 * 2. popup a message "copied!" when button is clicked
 */

