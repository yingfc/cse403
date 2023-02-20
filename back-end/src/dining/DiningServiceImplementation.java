package dining;

import dining.DiningInfo;
import db.GlobalDBCred;
import spark.QueryParamsMap;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DiningServiceImplementation implements DiningService{
    @Override
    public Collection<DiningInfo> getAllDiningPlaces() {
        List<DiningInfo> res = new ArrayList<>();

        Connection conn = null;
        Statement stmt = null;
        try{
            // register JDBC driver
            Class.forName(GlobalDBCred.JDBC_DRIVER);

            System.out.print("Link to database   ");
            conn = DriverManager.getConnection(GlobalDBCred.DB_URL,GlobalDBCred.USER,GlobalDBCred.PASS);

            // querying
            System.out.println(">>> Querying All DiningPlaces");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT * FROM dining INNER JOIN building ON dining.Building_Abbr=building.Building_Abbr";
            ResultSet rs = stmt.executeQuery(sql);

            // expand result
            while(rs.next()){
                String abbr  = rs.getString("Building_Abbr");
                String buildingName = rs.getString("building_name");
                String diningName = rs.getString("dining_name");
                String type = rs.getString("Type");
                double latitude = rs.getDouble("Latitude");
                double longitude = rs.getDouble("Longitude");

                res.add(new DiningInfo(abbr, buildingName, diningName, type, latitude, longitude));
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

}
