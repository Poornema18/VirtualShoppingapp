package servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.ProductBean;
import database.DataBasedao;

@WebServlet("/Orders")
public class Orders extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
    public Orders() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String Name=request.getParameter("name");
		
		DataBasedao d1=new DataBasedao();
		String data=d1.getOrderDetails();
	    response.setContentType("text/html");
	    response.getWriter().print(data); 
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		String Name=request.getParameter("name");
		String Price=request.getParameter("Price");
		String Qty=request.getParameter("Qty");
		String orderid=request.getParameter("orderid");
		
		DataBasedao productdao=new DataBasedao();
		String result=productdao.UpdateOrderDetails(Name,Price,Qty,orderid);
		response.setContentType("text/html");
		response.getWriter().print(result);
		//System.out.println("name "+Name+" price"+ Price +"qty"+ Qty+" result "+result);
	}

}
