 // include bootstrap
 var bootstrap = document.createElement("script");
 bootstrap.src = "bootstrap.bundle.min.js";
 document.head.appendChild(bootstrap);

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
    btn.setAttribute("data-placement","left")
    btn.setAttribute("data-original-title", "Copy to Clipboard\b  \b \b");
    //btn.setAttribute("title", "Copy to Clipboard\b \b");
    btn.innerHTML = "Copy";
    var pre = block.parentNode;
    pre.parentNode.insertBefore(btn, pre);
    mouseOver(btn);
    // Define CSS of button when mouse is out
    // Hide tooltip of the button
    $('.copyButton').mouseout(function(){
        $('.copyButton').css(css);
        $('.copyButton').tooltip('hide');
        btn.setAttribute("data-original-title", "Copy to Clipboard\b  \b \b");
    });
}

// CSS styling for the button
var css = {
        'font-size': '11px',
        display: 'block',
        'z-index': '5',
        'margin-left': 'auto',
        padding: '0.1rem 0.6rem',
        color: 'black',
        'background-color': 'transparent',
        'border-radius': '5px',
        'box-shadow': 'none',
        'border': '1.2px solid #606263'
}
var hoverCSS = {
    color: 'white',
    'background-color':'#007bff',
    cursor: 'pointer'
}

$('.copyButton').css(css);
// Define CSS of button when mouse is over
// Show tooltip of the button
function mouseOver(btn){
    $('.copyButton').mouseover(function(event){
        $(event.target).css(hoverCSS);
        $(event.target).tooltip('show');
        event.target.addEventListener('click', function(){
            // Writes the code to clipboard with Asynchronous Clipboard API
            navigator.clipboard.writeText(block.innerText);
            event.target.setAttribute("data-original-title", "Copied！\b \b \b");
            //$(event.target).tooltip('hide');
            $(event.target).tooltip('show');
        })
    });
}

