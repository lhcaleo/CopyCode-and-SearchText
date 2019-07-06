 // Include bootstrap
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

function addButton(block,item){
    var btn = document.createElement("button");
    btn.type = "button"; //The button is a clickable button
    btn.className = "copyButton";
    btn.setAttribute("data-toggle","tooltip");
    btn.setAttribute("data-placement","left");
    btn.setAttribute("data-original-title", "\b \b \bCopy to Clipboard\b -->\b \b");
    btn.innerHTML = "Copy";
    var pre = block.parentNode;
    pre.parentNode.insertBefore(btn, pre);
    // Add mouse listeners
    mouseOver(btn,item);
    mouseOut(btn);
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
// Initialize button style
$('.copyButton').css(css);
// Define CSS of button when mouse is over
// Show tooltip of the button
function mouseOver(button,item){
    $(button).mouseover(function(event){
        $(event.target).css(hoverCSS);
        // Styling tooltip
        // Show up when mouse is over
        $(event.target).tooltip('show');
        $(".tooltip-inner").css({
            "background-color": "black",
            "color":"white",
            "text-align": "center",
            'font-size': '13px',
            'max-width':'500px',
            'padding': '0.4rem 0.4rem',
            'border-radius': '35px',
        });
        event.target.addEventListener('click', function(){
            // Writes the code to clipboard with Asynchronous Clipboard API
            navigator.clipboard.writeText(block[item].innerText);
            event.target.setAttribute("data-original-title", "\b \b \bCopied !\b \b \b");
            $(event.target).tooltip('show');
        })
    });
}
// Define CSS of button when mouse is out
// Hide tooltip of all buttons
function mouseOut(button){
    $('.copyButton').mouseout(function(){
        $('.copyButton').css(css);
        $('.copyButton').tooltip('hide');
        button.setAttribute("data-original-title", "\b \b \bCopy to Clipboard\b -->\b \b");
    });
}