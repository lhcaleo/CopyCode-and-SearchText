// A javascript runs on the particular url
// content script send message to show page action
chrome.runtime.sendMessage({
    todo: "showPageAction"
});
alert("Hello from content.js")
$('span').css('color', "red");
$('code').css("font-size","15px")
var btn = document.createElement("button");
btn.innerHTML="copy";
btn.setAttribute("class","copyButton");
$('code').append(btn);

var css = {
        position: 'relative',
        top: '0.5rem',
        right: '0.5rem',
        //z-index: '10',
        display: 'block',
        padding: '0.25rem 0.5rem',
        color: 'DimGrey',
        'background-color': 'transparent',
        border: '0'
}
$('.copyButton').css(css);

//$('pre.default.prettyprint.prettyprinted').hide();
//$('pre.default.prettyprint.prettyprinted').css("font-size","5px")
//$('div.user-info').hide();
//$('div.user-hover').hide();
//$('span').appendTo('.user-info user-hover');
//$('button').hide();