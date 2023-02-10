package building;

import db.GlobalDBCred;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class BuildingServiceImplementation implements BuildingService {
    @Override
    public Collection<BuildingInfo> getAllBuildings() {
        List<BuildingInfo> res = new ArrayList<>();

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
                double latitude = rs.getDouble("latitude");
                double longitude = rs.getDouble("longitude");

                res.add(new BuildingInfo(abbr, name, latitude, longitude));
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
        return res;
    }

    @Override
    public BuildingInfo getBuilding(String building_abbr) {
        BuildingInfo res = null;

        Connection conn = null;
        PreparedStatement pstmt = null;
        String SQL_QUERY = "SELECT * FROM building WHERE building.building_abbr=?";
        try{
            // register JDBC driver
            Class.forName(GlobalDBCred.JDBC_DRIVER);

            System.out.println("Link to database");
            conn = DriverManager.getConnection(GlobalDBCred.DB_URL,GlobalDBCred.USER,GlobalDBCred.PASS);

            // querying
            System.out.println("===== Querying =====");
            pstmt = conn.prepareStatement(SQL_QUERY);
            pstmt.setString(1, building_abbr);

            ResultSet rs = pstmt.executeQuery();

            // expand result
            if (rs.next()) {
                String abbr  = rs.getString("building_abbr");
                String name = rs.getString("building_full_name");
                double latitude = rs.getDouble("latitude");
                double longitude = rs.getDouble("longitude");

                res = new BuildingInfo(abbr, name, latitude, longitude);
            }
            rs.close();
            pstmt.close();
            conn.close();
        } catch(SQLException se) {
            se.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(pstmt!=null) pstmt.close();
            } catch(SQLException se2){
            }
            try {
                if(conn!=null) conn.close();
            } catch(SQLException se){
                se.printStackTrace();
            }
        }
        return res;
    }
}
