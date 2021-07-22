
function preback(){window.history.forward();}
setTimeout("preback()",0);
console.log("done preback")
window.onunload=function(){null};

var button=document.getElementById("LogBackIn");
button.addEventListener("click",function(){
	console.log("button clicked")
	document.location.href="../index.html";
})