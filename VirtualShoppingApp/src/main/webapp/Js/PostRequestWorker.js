var handleRequest=function(data){
	postMessage(data);
}

addEventListener("message",function(e){
	var xhr=new XMLHttpRequest;
	xhr.open('post',e.data);
	xhr.onload=function(e){
		if(xhr.readyState===4 &&xhr.status==200){
			handleRequest(xhr.responseText)
		}
	}
	xhr.send()
})