package servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.DataBasedao;

/**
 * Servlet implementation class UpdateWallet
 */
@WebServlet("/UpdateWallet")
public class UpdateWallet extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public UpdateWallet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/*protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}*/

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
        String user=request.getParameter("name");
        String amt=request.getParameter("amount");
        String action=request.getParameter("action");
        float amount=Float.parseFloat(amt);
        
        DataBasedao productdao=new DataBasedao();
        String wallet="error";
        //System.out.println(" in update wallet servelet ");
        //System.out.println(" user "+amount);
        switch(action) {
        case "add":
        	wallet=productdao.updateWalletInfo(user,amount,"add");
        	break;
        case "update":
        	wallet=productdao.updateWalletInfo(user,amount,"update");
        	break;
        	
        }
		response.setContentType("text/html");
		response.getWriter().print(wallet);
	}
}
