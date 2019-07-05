// A javascript runs on the particular url
// content script send message to show page action
chrome.runtime.sendMessage({
    todo: "showPageAction"
});

var block = document.querySelectorAll("pre > code");
block.forEach(addButton);

function addButton(block){
    var btn = document.createElement("button");
    btn.className = "copyButton";
    btn.type = "button"; //The button is a clickable button
    btn.innerHTML = "Copy";
    var pre = block.parentNode;
    pre.parentNode.insertBefore(btn, pre);
}

var css = {
        'font-size': '1.1rem',
        display: 'block',
        'z-index': '5',
        top: '2.7rem',
        'margin-left': 'auto',
        padding: '0.3rem 0.7rem',
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
$('.copyButton').mouseover(function(){
    $('.copyButton').css(hoverCSS);
});
$('.copyButton').mouseout(function(){
    $('.copyButton').css(css);
});
