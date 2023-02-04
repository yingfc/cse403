package navigation;

import db.GlobalDBCred;

import java.sql.*;

public class ClassToBuilding {

    private static final String SQL_QUERY = "SELECT b.building_full_name FROM building as b, class as c WHERE c.major_abbr=? AND c.course_num=? AND c.section=? AND b.building_abbr=c.building_abbr;";

    public static void main(String[] args) {
        System.out.println(getBuildingFromClass("CSE", 403, "A"));
        System.out.println(getBuildingFromClass("CSE", 484, "A"));
        System.out.println(getBuildingFromClass("CSE", 451, "A"));
    }

    public static String getBuildingFromClass(String major, Integer courseNum, String section) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        try{
            Class.forName(GlobalDBCred.JDBC_DRIVER);
            conn = DriverManager.getConnection(GlobalDBCred.DB_URL,GlobalDBCred.USER,GlobalDBCred.PASS);
            pstmt = conn.prepareStatement(SQL_QUERY);
            pstmt.setString(1, major);
            pstmt.setInt(2, courseNum);
            pstmt.setString(3, section);
            ResultSet rs = pstmt.executeQuery();
            String res = "";
            // expand result
            while(rs.next()){
                res = rs.getString("building_full_name");
            }
            rs.close();
            pstmt.close();
            conn.close();
            return res;
        } catch(Exception se) {
            se.printStackTrace();
        } finally {
            try {
                if(pstmt!=null) pstmt.close();
            } catch(SQLException ignored){
            }
            try {
                if(conn!=null) conn.close();
            } catch(SQLException se){
                se.printStackTrace();
            }
        }
        return "";
    }
}
