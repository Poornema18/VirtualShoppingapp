var handleRequest=function(data){
	postMessage(data);
}

addEventListener("message",function(e){
	var xhr1=new XMLHttpRequest;
	xhr1.open('get',e.data);
	xhr1.onload=function(e){
		if(xhr1.readyState===4 &&xhr1.status==200){
			handleRequest(xhr1.responseText)
		}
	}
	xhr1.send()
})