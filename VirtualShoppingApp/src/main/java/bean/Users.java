package bean;

public class Users {

	private String Uname,Upass;
	
	public Users(String uname,String upass) {
		
		this.Uname=uname;
		this.Upass=upass;
	}
	
	public String getUname() {
		return Uname;
	}
	public void setUname(String uname) {
		this.Uname=uname;
	}
	public String getUpass() {
		return Upass;
	}
	public void setUpass(String upass) {
		this.Upass=upass;
	}
}
