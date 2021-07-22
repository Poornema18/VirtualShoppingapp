
var index=function(){
	
	//var validaterequest= new XMLHttpRequest();
	function Login(event,action){
		var result="";
		var button=event.target
		//console.log(button+" "+event+" "+action)
		button=button.parentElement;
		var id=button.getElementsByClassName("input_field")[0].value;
		var pswd=button.getElementsByClassName("input_field")[1].value;
		if(id!=""&&pswd!=""){
			sessionStorage.setItem(action,id);
			  document.cookie='user='+id+";Path=/;Expires=Thu, 20 Jan 2040 00:00:00 GMT;domain=localhost;";
			var worker=new Worker('./Js/PostRequestWorker.js');
			worker.postMessage("/VirtualShoppingApp/Login?pswd=" +pswd+"&id=" +id+"&action="+action);
			worker.addEventListener('message',function(e){
				console.log("worker data "+e.data);
				result=e.data;
				switch(result){
						case "successfully logged in as admin":
							document.location.href="Html/ProductDetail.html";
							
							break;
						case "successfully logged in as user":
							document.location.href="Html/ViewProducts.html";
							break;
						default:
							sessionStorage.removeItem("user");
							break;
					}
					alert(result);
			})
		}
		else{
			if(id=="")
				alert("Please enter "+action+" name");
			else
				alert("Please enter Password");
		}
	}
	
	
	return{
		Login:(event,action)=>Login(event,action),
		user:function() {
			document.getElementsByClassName("input_group")[1].style.display="block";
			document.getElementsByClassName("input_group")[0].style.display="none";
			},
		admin:function() {
			document.getElementsByClassName("input_group")[0].style.display="block";
			document.getElementsByClassName("input_group")[1].style.display="none";
			},
		RegisterClicked:()=>{document.location.href="Html/Register.html";},
	}
}();