package servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.DataBasedao;

/**
 * Servlet implementation class ProductDetais
 */
@WebServlet("/ProductDetais")
public class ProductDetais extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ProductDetais() {
        super();
        // TODO Auto-generated constructor stub
    }

	//protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	//}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				String user=request.getParameter("id");
				DataBasedao d1=new DataBasedao();
				String data=d1.getProductDetails();
			    response.setContentType("text/html");
			    response.getWriter().print(data); 
			    //System.out.println("in doget method of ProductDetails ");
	}

}
