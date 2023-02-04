import db.GlobalDBCred;

import java.sql.*;
 
public class MySqlDemo {

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        try{
            // register JDBC driver
            Class.forName(GlobalDBCred.JDBC_DRIVER);
        
            System.out.println("Link to database");
            conn = DriverManager.getConnection(GlobalDBCred.DB_URL,GlobalDBCred.USER,GlobalDBCred.PASS);
        
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