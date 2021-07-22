package bean;

public class ProductBean {

	
private String Pname,Pprice,Pquantity;
	
	public ProductBean(String Pname,String Pprice,String Pquantity) {
		this.Pname=Pname;
		this.Pprice=Pprice;
		this.Pquantity=Pquantity;
	}
	
	public ProductBean() {
		
	}

	public String getProductName() {
		return Pname;
	}
	public String getProductPrice() {
		return Pprice;
	}
	public String getProductQty() {
		return Pquantity;
	}
	public void setProductName(String Pname) {
		this.Pname=Pname;
	}
	public void setProductPrice(String Pprice) {
		this.Pprice=Pprice;
	}
	public void setProductQty(String PQty) {
		this.Pquantity=PQty;
	}
	 public String toString() {
	      return "Productt[ " +
	               "name = " + Pname +
	               ", price = " + Pprice +
	               ", qty = " + Pquantity +
	               
	             " ]";
	   }

}
