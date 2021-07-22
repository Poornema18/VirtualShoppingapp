package servelet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.ProductBean;
import database.DataBasedao;


/**
 * Servlet implementation class UpdateProducts
 */
@WebServlet("/UpdateProducts")
public class UpdateProducts extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public UpdateProducts() {
        super();
    }

	//protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	//}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		
		String Name=request.getParameter("name");
		String Price=request.getParameter("Price");
		String Qty=request.getParameter("Qty");
		String action=request.getParameter("action");
		
		DataBasedao productdao=new DataBasedao();
		ProductBean item =new ProductBean(Name,Price,Qty);
		String result="";
		switch(action) {
		case "insert":
			result=productdao.insertProduct(item);
			break;
		case "update":
			result=productdao.UpdateProduct(item);
			break;
		case "updateQty":
			result=productdao.UpdateProductQuantity(item);
			break;
			
		}
		response.setContentType("text/html");
		response.getWriter().print(result);
		//System.out.println("name "+Name+" price"+ Price +"qty"+ Qty);	
	   
	}

}
