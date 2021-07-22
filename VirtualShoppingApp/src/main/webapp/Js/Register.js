
var Register=function(){
	var userid;
	var password;
	var rePassword;
	function NewUserChanged(){
		userid=document.getElementsByClassName("input_field")[0].value;
		console.log(userid);
		//var validaterequest= new XMLHttpRequest();
		//validaterequest.open("post","/VirtualShoppingApp/Login?pswd="+"pswd"+"&id="+userid+"&action="+"newuser",true);
		//validaterequest.onload=function(){
			//if(validaterequest.readyState==4  && validaterequest.status==200){
		var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/Login?pswd="+"pswd"+"&id="+userid+"&action="+"newuser");
				worker.addEventListener('message',function(e){
				var result=e.data;
				if (result=="user found"){
					alert("username not available! use different name")
					document.getElementsByClassName("input_field")[0].value="";
				}
			})
		//}
		//}validaterequest.send();
	}
	function gotoIndex(){
		sessionStorage.setItem("user",userid);
		var result;
		//var addToDBrequest= new XMLHttpRequest();
		if(userid!=(""||undefined) && rePassword !=(""||undefined)){
			console.log(userid+" "+rePassword);
			//addToDBrequest.open("post","/VirtualShoppingApp/Register?new_user_id=" +userid+"&new_user_pswd="+rePassword,true);
			//addToDBrequest.onload=function(){
				//if(addToDBrequest.readyState==4  && addToDBrequest.status==200){
			var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/Register?new_user_id=" +userid+"&new_user_pswd="+rePassword);
				worker.addEventListener('message',function(e){
					result=e.data;
					if(result=="Data inserted Successfully"){
						alert("Registration Success!");
						document.location.href="ViewProducts.html";
					}else
						alert("Registration failed");
				})
			//}
			//}addToDBrequest.send();
		}else{
			if(userid==(""||undefined))
				alert("Please enter user id");
			else
				alert("Please enter Password");
		}
	}
	function NewRePassword(){
		password=document.getElementsByClassName("input_field")[1].value;
		rePassword=document.getElementsByClassName("input_field")[2].value;
		//console.log("user "+rePassword);
		if(password!=rePassword){
			alert("pasword not matched");
			document.getElementsByClassName("input_field")[2].value="";
		}
		else
			match="matched";
	}
	return{
		NewUserChanged:()=>NewUserChanged(),
		NewRePassword:()=>NewRePassword(),
		gotoIndex:()=>gotoIndex(),
	}

}();