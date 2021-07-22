import {user,logout,getWalletdata,updateMyWallet,updateWallet} from './Header.js';
var Checkout=function(){
	var item=JSON.parse(sessionStorage.getItem("item"))
	var products=JSON.parse(sessionStorage.getItem("products"))
	var total=sessionStorage.getItem("total")
	var Uname=user;
	window.onload=function(){	
		if (Uname==undefined){
			alert("Please login again!")
			document.location.href="../index.html";
		}
		if(item==null){
			getWalletdata(Uname);
			for(var i=0;i<products.length;i++){
				var row=document.createElement('tr');
				row.classList.add("row");
				var table=document.getElementsByClassName("table")[0];
				var td=`
						<td class="name">${products[i].name}</td>
						<td class="price">${products[i].price}</td>
						<td class="qty">${products[i].qty}</td>`
				row.innerHTML=td;
				table.append(row);
			}
			//getWalletdata(Uname)
			//document.getElementById("wallet").innerText=sessionStorage.getItem("wallet");
			document.getElementsByClassName("tprice")[0].innerHTML=total;
		}else{
			var row=document.createElement('tr');
			row.classList.add("row");
			var table=document.getElementsByClassName("table")[0];
			var td=`
					<td class="name">${item[0]}</td>
					<td class="price">${item[1]}</td>
					<td class="qty">${item[2]}</td>`
			row.innerHTML=td;
			table.append(row);
			document.getElementsByClassName("tprice")[0].innerHTML=item[3];
			document.getElementById("wallet").innerText=sessionStorage.getItem("wallet");
			sessionStorage.removeItem("item");
		}
	}
	function updateProduct(){
		var Name=document.getElementsByClassName("name");
		var Price=document.getElementsByClassName("price");
		var Qty=document.getElementsByClassName("qty");
		for(var i=0;i<Name.length;i++){
			if(Name!=""&&Price!=""&&Qty!=""){
				var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/UpdateProducts?name="+Name[i].innerText+"&Price="+Price[i].innerText.replace("Rs. ",'')+"&Qty="+Qty[i].innerText+"&action=updateQty");
				worker.addEventListener('message',function(e){
					var result=e.data;
					if(result!="Data updated Successfully")
						alert("UNABLE TO update PRODUCT  CHECK YOUR CONNECTION!");
				})
			}else
				alert("product data cannot be null ");
		}
	}
	function orderPlaced(){
		var ordertotal=document.getElementsByClassName("tprice")[0].innerHTML;
		var orderid=Math.floor(Math.random()*(4000-1000+1))+1000;
		var Name=document.getElementsByClassName("name");
		var Price=document.getElementsByClassName("price");
		var Qty=document.getElementsByClassName("qty");
		for(var i=0;i<Name.length;i++){
			if(Name!=""&&Price!=""&&Qty!=""){
			var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/Orders?name="+Name[i].innerText+"&Price="+Price[i].innerText.replace("Rs. ",'')+"&Qty="+Qty[i].innerText+"&orderid="+orderid);
				worker.addEventListener('message',function(e){
					var result=e.data;
					if(result!="order inserted Successfully")
						alert("UNABLE TO update order  CHECK YOUR CONNECTION!");
				})
			}else
				alert("product data cannot be null ");
		}
		updateWallet(Uname,parseFloat(ordertotal),"update");
		updateProduct();
		var btn=event.target;
		btn.style.display="none";
		document.getElementById("result").innerText="Order placed successfully";
	}
return{
	logout:()=>logout(),
	updateMyWallet:()=>updateMyWallet(Uname),
	orderPlaced:()=>orderPlaced(),
	
	}
}();
window.Checkout=Checkout