package dining;

import dining.DiningInfo;
import db.GlobalDBCred;
import spark.QueryParamsMap;

import java.net.Inet4Address;
import java.sql.*;
import java.util.*;

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
            sql = "SELECT * FROM dining INNER JOIN building ON dining.building_abbr=building.building_abbr INNER JOIN dining_open_hr ON dining.dining_id=dining_open_hr.dining_id";

            ResultSet rs = stmt.executeQuery(sql);
            Map<Integer, DiningInfo> diningMap = new HashMap<>();
            TimeZone pst =  TimeZone.getTimeZone("America/Los_Angeles");
            Calendar pstCalendar = new GregorianCalendar(pst, Locale.US);
            String calendarDayOfWeek = pstCalendar.getDisplayName(Calendar.DAY_OF_WEEK ,Calendar.LONG, Locale.US);
            int currentHourMin = pstCalendar.get(Calendar.HOUR_OF_DAY) * 60 + pstCalendar.get(Calendar.MINUTE);
            // expand result
            while(rs.next()){
                int dining_id = rs.getInt("dining_id");
                String weekDay = rs.getString("day");
                Time openTime = rs.getTime("open");
                Time closeTime = rs.getTime("close");
                DiningInfo.OperationTime opTime;
                if (openTime == null || closeTime == null) {
                    opTime = null;
                } else {
                    opTime = new DiningInfo.OperationTime(DiningInfo.Weekday.valueOf(weekDay.toUpperCase()), openTime.toString(), closeTime.toString());
                }
                DiningInfo diningPlace = diningMap.get(dining_id);
                if (diningPlace == null) {
                    String abbr = rs.getString("building_abbr");
                    String diningName = rs.getString("dining_name");
                    String type = rs.getString("dining_type");
                    double latitude = rs.getDouble("latitude");
                    double longitude = rs.getDouble("longitude");
                    Collection<DiningInfo.OperationTime> opTimeSet = new HashSet<>();
                    if (opTime != null) {
                        opTimeSet.add(opTime);
                    }
                    diningPlace = new DiningInfo(abbr, diningName, type, latitude, longitude, opTimeSet);
                    res.add(diningPlace);
                    diningMap.put(dining_id, diningPlace);
                } else if (opTime != null) {
                    diningPlace.getOperationTime().add(opTime);
                }

                if (opTime != null && calendarDayOfWeek.toUpperCase().equals(weekDay.toUpperCase())) {
                    int open = openTime.getHours() * 60 + openTime.getMinutes();
                    int close = closeTime.getHours() * 60 + closeTime.getMinutes();
                    diningPlace.setIsOpen((currentHourMin >= open) && (currentHourMin < close));
                }
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
