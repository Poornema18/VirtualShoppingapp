import {user,logout,updateMyWallet,getWalletdata} from './Header.js';
var ViewProducts= function(){
	var Product;
	//var Uname=sessionStorage.getItem("user");
	//var Uname=getcookie("name")

	var Uname=user
	console.log("Uname"+Uname)
	window.onload=function(){
		if (Uname==undefined){
			alert("Please login again!")
			document.location.href="../index.html";
		}else{
			var worker=new Worker('../Js/PostRequestWorker.js');
			worker.postMessage("/VirtualShoppingApp/ProductDetais?id=user");
			worker.addEventListener('message',function(e){
				Product=JSON.parse(e.data);
				getProducts(Product);
				//getWalletdata(Uname);
				console.log("this is uname "+Uname);
				console.log(document.cookie)
				getWalletdata(Uname);
			})
		}
	}
	function getProducts(Products){
		for(var i=0;i<Products.products.length;i++){//console.log("in for");
			var allProducts=document.getElementsByClassName("AllProducts")[0];
			var item=document.createElement('div');
			item.classList.add("Item");//console.log(item);
			if(Products.products[i].qty!=0){//item.getElementsByClassName("product_quantity").innerHtml="Product not available"
				var contents=` <div class="item_info">
						<h3 class="item_name" id="itemName">${Products.products[i].name}</h3>
						<h2 class="item_price" id="itemPrice">Rs. ${Products.products[i].price} </h2>
						<p class="product_quantity"  >Quantity available:${Products.products[i].qty}<br>Quantity Needed:
						<input class="input"  onchange="ViewProducts.quantityChanged('${Products.products[i].name}')" value="1"></input>
						</p>
						<button class="product_add"  id="btn" type="submit" onclick="ViewProducts.addToCartclicked()">Add to cart</button>
						<button class="product_buy"  id="buybtn" type="submit" onclick="ViewProducts.BuyProductclicked()">Buy</button>
						</div>`
				item.innerHTML=contents;//console.log(item);
				allProducts.append(item);//console.log(allProducts);
			}
		}
	}
	
	function addItemToCart(name,price){
		var item=document.createElement('p');
		item.classList.add("item");
		var allProducts=document.getElementsByClassName("AllProducts")[1];
		var itemNames=document.getElementsByClassName("name");
		for(var i=0;i<itemNames.length;i++){
			if(itemNames[i].innerText==name){
				alert("this item is already added to cart");
				//event.target.style.display="none";
				return
			}
		}
		var contents=`
					<span class="name">${name}</span>
					<span class="price">${price}</span>
					<input class="qty" onchange="ViewProducts.quantityChanged('${name}')" value="1" type="number"></input>
					<button class="remove" onclick="ViewProducts.remove()">remove</button>`
		item.innerHTML=contents;
		allProducts.append(item);
		updateCartTotal();
	}//onclick="addToCartclicked()"

	function updateCartTotal(){
		var  allProducts=document.getElementsByClassName("AllProducts")[1];
		var items=document.getElementsByClassName("item")
		var total=0,tqty=0;
		for(var i=0;i<items.length;i++){
			var item=items[i];
			var priceElement=item.getElementsByClassName("price")[0];
			var price=parseFloat(priceElement.innerText.replace("Rs.",''));
			var qty=item.getElementsByClassName("qty")[0].value;
			total=total+(price*qty);
			tqty=tqty+(qty);//console.log("price and qty total" +total);
		}
		document.getElementsByClassName("tprice")[0].innerText=total;
		//document.getElementsByClassName("tqty")[0].innerText=tqty
	}
	function BuyProductclicked(){
		var button=event.target;
		var item=button.parentElement.parentElement;
		var name=item.getElementsByClassName("item_name")[0].innerText;
		var price=parseFloat(item.getElementsByClassName("item_price")[0].innerText.replace("Rs.",''));
		var qty=item.getElementsByClassName("input")[0].value;	//quantityChanged();
		var total=price*qty;
		if(parseFloat(total)<=sessionStorage.getItem("wallet")){
			var item=[name,price,qty,total];
			sessionStorage.setItem("item",JSON.stringify(item));//updateWallet(sessionStorage.getItem("wallet")-parseFloat(total));//alert("update wallet called")
			document.location.href="Checkout.html";
		}else
			alert("You have innsufficient balance!Update your wallet to continue");
		
	}
	function quantityChanged (name){
		var input=event.target;
		if(isNaN(input.value) ||input.value<=0){
			input.value=1;
		}else{
			for(var i=0;i<Product.products.length;i++){//console.log("in for")
				if(Product.products[i].name==name){
				//console.log("in if name"+Product.products[i].name+" element "+name+" value "+input.value+" original qty "+Product.products[i].qty)
					if(parseInt(input.value) > parseInt(Product.products[i].qty)){
					//console.log("input.value "+input.value+" > original qty"+Product.products[i].qty);
						alert("your quantity is more than available limit");
						input.value=Product.products[i].qty;
					}
					break;
				}
			}
		}
		updateCartTotal();
	}
	function GotoCheckout(){
		//var button=event.target;
		//var item=button.parentElement;
		//var allProducts=document.getElementsByClassName("AllProducts")[1];
		var name=document.getElementsByClassName("name");
		var price=document.getElementsByClassName("price");
		var qty=document.getElementsByClassName("qty");
		if(name.length==0){
			alert("your cart is empty! please add any products to continue:)");
		}else{
			var product=[{"name":name[0].innerText,"price":price[0].innerText,"qty":qty[0].value}]
			var total=document.getElementsByClassName("tprice")[0].innerText;
			if(parseFloat(total)<=sessionStorage.getItem("wallet")){
				for(var i=1;i<name.length;i++){
					product.push({"name":name[i].innerText,"price":price[i].innerText,"qty":qty[i].value});
				}
				sessionStorage.setItem("products",JSON.stringify(product));
				sessionStorage.setItem("total",total);
				document.location.href="Checkout.html";
			}else
				alert("You have innsufficient balance!Update your wallet to continue");
			
		}
	}
	function addToCartclicked(){
		var button=event.target;
		var item=button.parentElement.parentElement;
		var name=item.getElementsByClassName("item_name")[0].innerText;
		var price=item.getElementsByClassName("item_price")[0].innerText;//console.log(name+"  "+price);
		addItemToCart(name,price);
	}
	function remove(){
		var btn=event.target;
		btn.parentElement.remove();
		updateCartTotal();
	}
	
	return{
		logout:()=>logout(),
		updateMyWallet:()=>updateMyWallet(Uname),
		BuyProductclicked:()=>BuyProductclicked(),
		quantityChanged:(name)=>quantityChanged(name),
		GotoCheckout:()=>GotoCheckout(),
		addToCartclicked:()=>addToCartclicked(),
		remove:()=>remove(),
		
	}
}();
window.ViewProducts=ViewProducts
