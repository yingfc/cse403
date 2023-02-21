package navigation;

import db.GlobalDBCred;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SameClass {

    public static final String SQL_QUERY = "SELECT c2.major_abbr, c2.course_num, c2.section " +
            "FROM class as c1, class as c2 " +
            "WHERE c1.major_abbr=? AND c1.course_num=? AND c1.section=? " +
            "AND c1.building_abbr=c2.building_abbr AND c1.class_time=c2.class_time " +
            "AND c1.class_days=c2.class_days AND c1.major_abbr!=c2.major_abbr " +
            "AND c1.course_num!=c2.course_num AND c1.section!=c2.section;";

    public static void main(String[] args) {
        System.out.println(sameClasses("CSE", 403, "A"));
        System.out.println(sameClasses("CSE", 484, "A"));
        System.out.println(sameClasses("CSE", 451, "A"));
    }

    public static List<String> sameClasses(String major, Integer courseNum, String section) {
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
            List<String> res = new ArrayList<>();
            while(rs.next()){
                String nextMajor = rs.getString("major_abbr");
                int nextCourseNum = rs.getInt("course_num");
                String nextSection = rs.getString("section");
                res.add(nextMajor + " " + nextCourseNum + " " + nextSection);
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
        return new ArrayList<>();
    }
}
