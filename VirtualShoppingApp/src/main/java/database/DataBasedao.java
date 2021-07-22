package database;

import java.io.*;



import java.sql.Array;
import java.sql.Connection;



import java.sql.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpSession;

import org.json.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mysql.cj.protocol.Resultset;

import bean.ProductBean;
import bean.Users;


public class DataBasedao {
	
	
	private String dburl="jdbc:mysql://127.0.0.1:3306/?user=root";
	private String dbUname="root";
	private String dbpassword="Poorne@18";
	private String dbdriver="com.mysql.cj.jdbc.Driver";
	
	public  void loadDriver(String dbDriver) {
		try {
			Class.forName(dbDriver);
		} 
		catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
	}
	
	public Connection getConnection() {
		Connection con=null;
		try {
			con=DriverManager.getConnection(dburl, dbUname,dbpassword);
			
		}
		catch (SQLException e) {
			
			e.printStackTrace();
		}	
		return con;
		
	}
public String CheckUser(String id) {
		
		//HttpSession session = null;
		
		//System.out.println("in validate user");
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result="found Successfully";
		String sql="select Uname from userdb.users where Uname=?";
		PreparedStatement ps;
		
		try {
			
			ps=con.prepareStatement(sql);
			ps.setString(1, id);
			ResultSet rs=ps.executeQuery();
			boolean n=rs.next();
			if(n) {
				result="user found";
			}
		} catch (SQLException e) {
			System.out.println("in catech");
			e.printStackTrace();
			result="some error in db";
		}
		return result;
	}
	public String ValidateUser(Users user) {	
		//System.out.println("in validate user");
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result=user.getUname()+" is not a registered user";
		String sql="select Uname,Upass from userdb.users where Uname=? and Upass=?";
		PreparedStatement ps;
		
		try {
			
			ps=con.prepareStatement(sql);
			ps.setString(1, user.getUname());
			ps.setString(2, user.getUpass());
			ResultSet rs=ps.executeQuery();
			boolean n=rs.next();
			if(n) {
				result="successfully logged in as user";
				getProductDetails();
			}
			else {
				result="username and password not matched";
			}
		} catch (SQLException e) {
			System.out.println("in catech");
			e.printStackTrace();
			
		}
		return result;
	}
	
	public String insertUser(Users user) {
		
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result="Data inserted Successfully";
		String sql="insert into userdb.users(Uname,Upass) values(?,?)";
		
		
		PreparedStatement ps;
		
		try {
			ps=con.prepareStatement(sql);
			ps.setString(1, user.getUname());
			ps.setString(2, user.getUpass());
			ps.executeUpdate();
		} catch (SQLException e) {
			
			e.printStackTrace();
			result="Data not inserted";
		}
		return result;
	}

	public String ValidateAdmin(String id, String pswd) {
		
		//System.out.println("in validate admin");
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result=id+" is not a registered admin";
		String sql="select * from admindb.admins where adminid=? and password=?";
		PreparedStatement ps;
		try {
			ps=con.prepareStatement(sql);
			ps.setString(1, id);
			ps.setString(2, pswd);
			
			ResultSet rs=ps.executeQuery();
			boolean n=rs.next();
			//System.out.println("validate admin try  "+n+"  "+id+" "+pswd);
			if(n) {
				result="successfully logged in as admin";
			}
			else {
				result="username and password not matched";
			}
		} catch (SQLException e) {
			System.out.println("in catech");		
			e.printStackTrace();
			
		}
		return result;
	}
	
	public String getProductDetails() {
		JSONObject jsonObject=new JSONObject();
		JSONArray array=new JSONArray();
		loadDriver(dbdriver);
		Connection con=getConnection();
		String sql="select * from productdb.products";
		String ProductJson="unable to fetch";
		Statement smt;
		try {
			smt= con.createStatement();
			ResultSet rs= smt.executeQuery(sql);
			while (rs.next()) {
				//System.out.println("in get product details while");
				JSONObject record=new JSONObject();
				record.put("name", rs.getString("name"));
				record.put("price", rs.getString("price"));
				record.put("qty", rs.getString("qty"));
				array.put(record);
				}
			    jsonObject.put("products", array);
			    //FileWriter file = new FileWriter("products.json");
			    //file.write(jsonObject.toString());
			    //file.flush();
				ProductJson=jsonObject.toString();
				//System.out.println("in get product details file write "+ jsonObject.toString());	
				}
			    catch (Exception e) {
					e.printStackTrace();
				}
		
		return ProductJson;
	}
	
	public String insertProduct(ProductBean item) {
		
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result="Data inserted Successfully";
		String sql="insert into productdb.products (name,price,qty) values(?,?,?)";
	
		PreparedStatement ps;
		
		try {
			ps=con.prepareStatement(sql);
			ps.setString(1, item.getProductName());
			ps.setString(2, item.getProductPrice());
			ps.setString(3, item.getProductQty());
			ps.executeUpdate();
		} 
		catch (SQLException e) {
			
			e.printStackTrace();
			result="Data not inserted";
		}
		return result;
	}
public String deleteProduct(String name) {
		
		loadDriver(dbdriver);
		Connection con=getConnection();
		String result="Data deleted Successfully";
		String sql="DELETE FROM productdb.products WHERE (name = ?)";
		
		PreparedStatement ps;
		
		try {
			ps=con.prepareStatement(sql);
			ps.setString(1, name);
			//ps.setString(2, item.getProductPrice());
			//ps.setString(3, item.getProductQty());
			ps.executeUpdate();
		} 
		catch (SQLException e) {
			
			e.printStackTrace();
			result="Data not deleted";
		}
		return result;
	}

public String UpdateProduct(ProductBean item) {
	
	loadDriver(dbdriver);
	Connection con=getConnection();
	String result="Data updated Successfully";
	String sql="update productdb.products set price=?,qty=? where name=?";
	
	PreparedStatement ps;
	
	try {
		ps=con.prepareStatement(sql);
		
		ps.setString(1, item.getProductPrice());
		ps.setString(2, item.getProductQty());
		ps.setString(3, item.getProductName());
		ps.executeUpdate();
	} 
	catch (SQLException e) {
		
		e.printStackTrace();
		result="Data not updated";
	}
	return result;
}
public String getwalletInfo(String user) {
	
	loadDriver(dbdriver);
	Connection con=getConnection();
	String result="unable to fetch";
	String sql="select Wallet from userdb.users where ( Uname = ? )";
	//System.out.println("in get wallet details while "+user);
	PreparedStatement ps;
	
	try {
		ps=con.prepareStatement(sql);
		ps.setString(1, user);
		ResultSet rs= ps.executeQuery();
		//System.out.println("in get wallet details while " +ps);
		rs.next();
		float wallet=rs.getFloat("Wallet");
		return String.valueOf(wallet);

	}catch (SQLException e) {
		e.printStackTrace();
		return result;
	}
	
}

public String updateWalletInfo(String user, float amount,String action) {
	loadDriver(dbdriver);
	Connection con=getConnection();
	String result="wallet updated";
	String sql=(action=="add")?"update userdb.users set Wallet= Wallet+? where Uname=?":"update userdb.users set Wallet= Wallet-? where Uname=?";
	//System.out.println("in update wallet dbdao "+user+" "+amount);
	PreparedStatement ps;
	
	try {
		ps=con.prepareStatement(sql);
	
		ps.setFloat(1, amount);
		ps.setString(2, user);
		//System.out.println(""+ps);
		ps.executeUpdate();
		
		return result;

	}catch (SQLException e) {
		e.printStackTrace();
		result="unable to update your wallet";
		return result;
	}
	
}

public String UpdateProductQuantity(ProductBean item) {
	loadDriver(dbdriver);
	Connection con=getConnection();
	String result="Data updated Successfully";
	String sql="update productdb.products set qty=qty-? where name=?";
	
	PreparedStatement ps;
	
	try {
		ps=con.prepareStatement(sql);
		
		//ps.setString(1, item.getProductPrice());
		ps.setString(1, item.getProductQty());
		ps.setString(2, item.getProductName());
		ps.executeUpdate();
	} 
	catch (SQLException e) {
		
		e.printStackTrace();
		result="Data not updated";
	}
	return result;

}

public String UpdateOrderDetails(String name, String price, String qty, String orderid) {
	loadDriver(dbdriver);
	Connection con=getConnection();
	String result="order inserted Successfully";
	String sql="insert into productdb.orders (productname,price,qty,orderid) values(?,?,?,?)";
	PreparedStatement ps;
	
	try {
		ps=con.prepareStatement(sql);
		ps.setString(1, name);
		ps.setString(2, price);
		ps.setString(3, qty);
		ps.setString(4,orderid);
		ps.executeUpdate();
	} 
	catch (SQLException e) {
		
		e.printStackTrace();
		result="order Data not inserted";
	}
	return result;
	
}

public String getOrderDetails() {
	JSONObject jsonObject=new JSONObject();
	JSONArray array=new JSONArray();
	loadDriver(dbdriver);
	Connection con=getConnection();
	String sql="select * from productdb.orders";
	String OrderJson="unable to fetch";
	Statement smt;
	try {
		smt= con.createStatement();
		ResultSet rs= smt.executeQuery(sql);
		while (rs.next()) {
			//System.out.println("in get product details while");
			JSONObject record=new JSONObject();
			record.put("name", rs.getString("productname"));
			record.put("price", rs.getString("price"));
			record.put("qty", rs.getString("qty"));
			record.put("orderid",rs.getString("orderid"));
			array.put(record);
			}
		    jsonObject.put("orders", array);
		    //FileWriter file = new FileWriter("orders.json");
		    //file.write(jsonObject.toString());
		    //file.flush();
			OrderJson=jsonObject.toString();
			System.out.println("in get order details file write "+ jsonObject.toString());	
			}
		    catch (Exception e) {
				e.printStackTrace();
			}
	
	return OrderJson;
	
}

//public static void main(String args[]) {
//	DataBasedao dao=new DataBasedao();
//	String s1=dao.getOrderDetails();
//}
}
		


