import java.sql.*;
 
public class MySqlDemo {

    static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";  
    static final String DB_URL = "jdbc:mysql://34.145.35.221/dubmap_backend?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
 
    // Database credential
    static final String USER = "root";
    static final String PASS = "";     // ask @yingfc for password

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        try{
            // register JDBC driver
            Class.forName(JDBC_DRIVER);
        
            System.out.println("Link to database");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
        
            // querying
            System.out.println("===== Querying =====");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT * FROM building";
            ResultSet rs = stmt.executeQuery(sql);
        
            // expand result
            while(rs.next()){
                String abbr  = rs.getString("building_abbr");
                String name = rs.getString("building_full_name");
    
                System.out.print("Building Abbr: " + abbr);
                System.out.print(", Building Full Name: " + name);
                System.out.print("\n");
            }
            rs.close();
            stmt.close();
            conn.close();
        } catch(SQLException se) {
            se.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(stmt!=null) stmt.close();
            } catch(SQLException se2){
            }
            try {
                if(conn!=null) conn.close();
            } catch(SQLException se){
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
    }
}