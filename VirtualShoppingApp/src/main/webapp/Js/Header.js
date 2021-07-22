//var Header=function(){	
	//var Name=sessionStorage.getItem("user");
	
	function getcookie(Name){
		var cookie={};
		document.cookie.split(';').forEach(function(el){
			let [k,v]=el.split("=");
			cookie[k.trim()]=v;
		})
		return cookie[Name];
		
	}
	export var user=getcookie("user");
	export function getWalletdata(Name){
		//console.log(Name)
		//var Name=session.getattribute("user");
		var worker=new Worker('../Js/PostRequestWorker.js');
		worker.postMessage("/VirtualShoppingApp/Wallet?name="+Name);
		worker.addEventListener('message',function(e){
			var result=e.data;
			if(result=="unable to fetch wallet data"){
				alert(result);
			}else{
				sessionStorage.setItem("wallet",result);
				document.getElementById("wallet").innerText=parseFloat(result);
				document.getElementById("HdrName").innerText=Name;
			}//console.log(result);
		})
	}

	export function updateWallet(Name,amount,action){
		//var Name=sessionStorage.getItem("user");
		var ammount=amount+"";
		var worker=new Worker('../Js/PostRequestWorker.js');
		worker.postMessage("/VirtualShoppingApp/UpdateWallet?name="+Name+"&amount="+ammount+"&action="+action);
	
		worker.addEventListener('message',function(e){
			var result=e.data;
			if(result=="wallet updated"){
				if(action=="add")
					var newamount=amount+parseFloat(sessionStorage.getItem("wallet"));
				else if(action=="update")
					var newamount=parseFloat(sessionStorage.getItem("wallet")-amount);
					document.getElementById("wallet").innerText=newamount;
					sessionStorage.removeItem("wallet");
					sessionStorage.setItem("wallet",newamount);
			}else
				alert(result);
		})
	}
	export function logout(){
				sessionStorage.clear();
				document.cookie='user='+";Path=/;Expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=localhost";
				document.location.href="logout.html";
				//alert ("cookie deleted +"+document.cookie);
				//alert(user)
				alert("Logout Successfully");
	}
	export function updateMyWallet(Name){
		var amount=parseFloat(prompt("Enter Ammount to be Add in your wallet","1000"));
		updateWallet(Name,amount,"add");
		console.log("in update my wallet name"+Name)
	}
	
//}();

