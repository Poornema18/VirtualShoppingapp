package servelet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.Session;

import bean.Users;
import database.DataBasedao;


/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Login() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//doGet(request, response);
		String Pswd=request.getParameter("pswd");
		String Id=request.getParameter("id");
		String action=request.getParameter("action");
		//System.out.println("dopost   "+Id+" password "+Pswd+" "+action);
		DataBasedao d1=new DataBasedao();
		Users user=new Users(Id,Pswd);
		String result="";
		switch(action) {
		case "user":
			if(Id != null && Pswd !=null) {
	     		  result=d1.ValidateUser(user);
	     		  HttpSession session=request.getSession();
	     		  session.setAttribute("user", Id);
	     		  Cookie ck=new Cookie("users",Id);
			}
			break;
		case "admin":
			result=d1.ValidateAdmin(Id,Pswd);
			HttpSession session=request.getSession();
			session.setAttribute("user", Id);
			break;
		case "newuser":
			result=d1.CheckUser(Id);
			break;
		}
		  response.setContentType("text/html");
	      response.getWriter().print(result); 
	}

}
