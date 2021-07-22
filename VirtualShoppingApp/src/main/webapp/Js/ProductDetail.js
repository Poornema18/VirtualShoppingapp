import {user,logout} from './Header.js';
var ProductDetails=function(){
	
	var getworker=new Worker('../Js/GetRequestWorker.js');
	var orderlen;
	window.onload=function(){
		document.getElementById("HdrName").innerText=user;
		var Uname=sessionStorage.getItem("admin");
		if (Uname==null){
			alert("Please login again!")
			document.location.href="../index.html";
		}else{
			var request= "/VirtualShoppingApp/ProductDetais?id=user";
			var worker=new Worker('../Js/PostRequestWorker.js');
			worker.postMessage(request);
			worker.addEventListener('message',function(e){	
					var jsonObj=JSON.parse(e.data); 
					getProducts(jsonObj);
					getOrderDetails();
				
			})
		}
	}
	
	function getProducts(Products){
		for(var i=0;i<Products.products.length;i++){
			var allProducts=document.getElementsByClassName("AllProducts")[0];
			var item=document.createElement('div');
			item.classList.add("Item");
			var Price=parseInt(Products.products[i].price)
			var contents=` <div class="item_info">
    				   <h3 class="item_name" id="itemName">${Products.products[i].name}</h3>
                       <h4 class="item_price" id="itemPrice">Rs.
    				   <input class="price" value="${parseInt(Products.products[i].price)}" type="number"> </input></h4>
    				   <p class="product_quantity"  >Quantity available:
                       <input class="input"  value="${Products.products[i].qty}" type="number"></input>
                       </p>
    				   <button class="update"  id="btn" type="submit" onclick="ProductDetails.updateProduct()">Update</button> 
                       <button class="delete"  id="btn" type="submit" onclick="ProductDetails.deleteProduct()">Delete</button>                      
    				  </div>`
			item.innerHTML=contents;
			allProducts.append(item);//console.log(typeof Price);
		}
	}
//	function addNewProduct(){document.getElementsByClassName("input_form")[0].style.display="block";}
	function getOrderDetails(){
		getworker.postMessage("/VirtualShoppingApp/Orders?id=user");
		getworker.addEventListener('message',function(e){
				var jsonObj=JSON.parse(e.data);
				orderlen= jsonObj.orders.length; 
				getOrders(jsonObj);
		})
	}
	
	function getOrders(Orders){
		for(var i=0;i<orderlen;i++){//var allProducts=document.getElementsByClassName("order_details")[0];
			var row=document.createElement('tr');
			row.classList.add("table_row");
			var table=document.getElementsByClassName("table")[0];
			var contents=`<td class="name">${Orders.orders[i].name}</td>
							<td class="price">${Orders.orders[i].price}</td>
							<td class="qty">${Orders.orders[i].qty}</td>
							<td> ${Orders.orders[i].orderid}</td`
			row.innerHTML=contents;
			table.append(row);//console.log(Orders);
		}
	}
	function updateProduct(){
		var item=event.target.parentElement
		var Name=item.getElementsByClassName("item_name")[0].innerText;
		var Price=item.getElementsByClassName("price")[0].value;
		var Qty=item.getElementsByClassName("input")[0].value;
		var action="update";
		if(Name!=""&&Price!=""&&Qty!=""){
			var worker=new Worker('../Js/PostRequestWorker.js');
			worker.postMessage("/VirtualShoppingApp/UpdateProducts?name="+Name+"&Price="+Price+"&Qty="+Qty+"&action="+action);
			worker.addEventListener('message',function(e){	
					var result=e.data;
					if(result=="Data updated Successfully"){
						item.parentElement.remove();
						alert("Product updated successfully")
						addProduct(Name,Price,Qty);
					}else
						alert("UNABLE TO update PRODUCT  CHECK YOUR CONNECTION!");
			})
		}else
			alert("product data cannot be null ");
	}
	function deleteProduct(){
		var item=event.target.parentElement
		var Name=item.getElementsByClassName("item_name")[0].innerText;
		if(Name!=""&&Price!=""&&Qty!=""){
				var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/DeleteProduct?name="+Name);
				worker.addEventListener('message',function(e){
					var result=e.data;
					if(result=="Data deleted Successfully"){//addProduct(Name,Price,Qty);
						alert("Product deleted successfully")
						item.parentElement.remove();
					}else
						alert("UNABLE TO Delete PRODUCT  CHECK availability!");// console.log(result);
			})
			//deleteProductRequest.send(null)
		}else
			alert("product data cannot be null ");
	}
	function addProduct(Name,Price,Qty){
		var allProducts=document.getElementsByClassName("AllProducts")[0];
			var item=document.createElement('div');
			item.classList.add("Item");
			var contents=` <div class="item_info">
						<h3 class="item_name" id="itemName">${Name}</h3>
						<h4 class="item_price" id="itemPrice">Rs.
						<input class="price" value="${Price}" type="number"> </input></h4>
						<p class="product_quantity"  >Quantity available:
						<input class="input"  value="${Qty}" type="number"></input>
						</p>
						<button class="update"  id="btn" type="submit" onclick="ProductDetails.updateProduct()">Update</button>                       
						<button class="delete"  id="btn" type="submit" onclick="ProductDetails.deleteProduct()">Delete</button>
						</div>`
			item.innerHTML=contents;
			allProducts.append(item);
			document.getElementsByClassName("input_form")[0].style.display="none";
	}
	function formSubmit(){
		var Name=document.getElementById("Name").value;
		var Price=document.getElementById("Price").value;
		var Qty=document.getElementById("Qty").value;
		var ProductName=document.getElementsByClassName("item_name");
		var action="insert";
		for(var i=0;i<ProductName.length;i++){
			if(Name==ProductName[i].innerText)//console.log("product available");
				if(confirm("Product Already Available Do you want to update?"))
					action="update";
		}//console.log(Name+" "+ Price+" "+Qty);
		if(Name!=""&&Price!=""&&Qty!=""){
				var worker=new Worker('../Js/PostRequestWorker.js');
				worker.postMessage("/VirtualShoppingApp/UpdateProducts?name="+Name+"&Price="+Price+"&Qty="+Qty+"&action="+action);
				worker.addEventListener('message',function(e){
					var result=e.data;
					if(result=="Data inserted Successfully"){
						addProduct(Name,Price,Qty);
						alert("Product added successfully")
					}
					else if(result=="Data updated Successfully"){//item.parentElement.remove();
						alert("Product updated successfully")
						location.reload();//addProduct(Name,Price,Qty);
					}else{
						alert(result);//alert("UNABLE TO ADD PRODUCT  CHECK YOUR CONNECTION!");
					}// console.log(result);
				})
			}else
				alert("product data cannot be null ");
	}

	return {
		
		updateProduct:()=>updateProduct(),
		deleteProduct:()=>deleteProduct(),
		addProduct:()=>addProduct(Name,Price,Qty),
		formSubmit:()=>formSubmit(),
		logout:()=>logout(),
	}
}();
window.ProductDetails=ProductDetails