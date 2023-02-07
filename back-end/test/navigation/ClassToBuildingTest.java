package navigation;

import db.GlobalDBCred;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.sql.*;
import java.util.Properties;

public class ClassToBuildingTest {
    static Connection conn = null;
    private static PreparedStatement pstmt;

    private static ResultSet results = null;
    @BeforeClass
    public static void beforeClass() {
        // Properties for creating connection to database
        Properties props = new Properties();
        props.setProperty("user", GlobalDBCred.USER);
        props.setProperty("password", GlobalDBCred.PASS);

        try {
            // STEP 1: Register JDBC driver
            Class.forName(GlobalDBCred.JDBC_DRIVER).getDeclaredConstructor().newInstance();

            // STEP 2: Get connection to DB
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(GlobalDBCred.DB_URL, props);
            // conn = DriverManager.getConnection(DB_URL, props);
            System.out.println("Connected database successfully...");

            // STEP 3: Statement object to send the SQL statement to the Database
            System.out.println("Creating statement...");
            pstmt = conn.prepareStatement(ClassToBuilding.SQL_QUERY);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_CSE143A_SMI_pass() throws SQLException {
        String major = "CSE";
        int courseNum = 143;
        String section = "A";
        try {
            // STEP 4: Extract data from result set
            pstmt.setString(1, major);
            pstmt.setInt(2, courseNum);
            pstmt.setString(3, section);
            results = pstmt.executeQuery();
            while (results.next()) {
                String building = results.getString("building_full_name");
                System.out.println("Building: " + building);
                Assert.assertEquals(building, "Smith Hall");
            }
            results.close();
        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        }
    }

    @Test
    public void test_CSE403A_CSE2_pass() throws SQLException {
        String major = "CSE";
        int courseNum = 403;
        String section = "A";
        try {
            // STEP 4: Extract data from result set
            pstmt.setString(1, major);
            pstmt.setInt(2, courseNum);
            pstmt.setString(3, section);
            results = pstmt.executeQuery();
            while (results.next()) {
                String building = results.getString("building_full_name");
                System.out.println("Building: " + building);
                Assert.assertEquals(building, "Bill & Melinda Gates Center for Computer Science & Engineering");
            }
            results.close();
        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        }
    }

    @Test
    public void test_CSE400A_NonExist_fail() throws SQLException {
        String major = "CSE";
        int courseNum = 400;
        String section = "A";
        try {
            // STEP 4: Extract data from result set
            pstmt.setString(1, major);
            pstmt.setInt(2, courseNum);
            pstmt.setString(3, section);
            results = pstmt.executeQuery();
            Assert.assertFalse(results.next());
            results.close();
        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        }
    }

    @AfterClass
    public static void afterClass() {
        try {
            if (results != null)
                results.close();
            if (pstmt != null)
                pstmt.close();
            if (conn != null)
                conn.close();
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
}
