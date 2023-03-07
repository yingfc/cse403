package dining;

import org.junit.Test;
import java.sql.*;
import java.util.*;
import static org.junit.Assert.*;
public class DiningServiceTest {

    DiningServiceImplementation diningServiceImplementation = new DiningServiceImplementation();

    @Test
    public void test_getDiningPlaces_pass() throws SQLException {
        Collection<DiningInfo> res = diningServiceImplementation.getAllDiningPlaces();
        // Test if get dining places returns something.
        assertTrue(res.size() > 0);
    }

    @Test
    public void test_diningOpenTime_pass() throws SQLException {
        Collection<DiningInfo> res = diningServiceImplementation.getAllDiningPlaces();
        assertTrue(res.size() > 0);

        TimeZone pst =  TimeZone.getTimeZone("America/Los_Angeles");
        Calendar pstCalendar = new GregorianCalendar(pst, Locale.US);
        String calendarDayOfWeek = pstCalendar.getDisplayName(Calendar.DAY_OF_WEEK ,Calendar.LONG, Locale.US).toUpperCase();
        int currentHourMin = pstCalendar.get(Calendar.HOUR_OF_DAY) * 60 + pstCalendar.get(Calendar.MINUTE);

        for (DiningInfo diningInfo : res) {
            boolean shouldOpen = false;
            for (DiningInfo.OperationTime opTime : diningInfo.getOperationTime()) {
                if (opTime.day == DiningInfo.Weekday.valueOf(calendarDayOfWeek)) {
                    Time openTime = Time.valueOf(opTime.openTime);
                    Time closeTime = Time.valueOf(opTime.closeTime);
                    int open = openTime.getHours() * 60 + openTime.getMinutes();
                    int close = closeTime.getHours() * 60 + closeTime.getMinutes();
                    shouldOpen = (currentHourMin >= open) && (currentHourMin < close);
                }
            }
            // Test if DiningInfo isOpen is correctly set based on the current time.
            assertEquals(diningInfo.getIsOpen(), shouldOpen);
        }
    }
}