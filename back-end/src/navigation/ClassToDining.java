package navigation;

import db.GlobalDBCred;

import java.sql.*;

public class ClassToDining {

    public static final String SQL_QUERY = "SELECT d.building_full_name FROM dining as d, class as c WHERE c.major_abbr=? AND c.course_num=? AND c.section=? AND d.dining_name=c.dining_name;";

    public static void main(String[] args) {
        System.out.println(getDiningFromClass("CSE", 403, "A"));
        System.out.println(getDiningFromClass("CSE", 484, "A"));
        System.out.println(getDiningFromClass("CSE", 451, "A"));
    }

    public static String getDiningFromClass(String major, Integer courseNum, String section) {
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

