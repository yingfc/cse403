package building;

import org.junit.Test;
import spark.QueryParamsMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

public class BuildingServiceTest {
    BuildingServiceImplementation buildingServiceImplementation = new BuildingServiceImplementation();
    @Test
    public void test_getBuilding_CSE2_pass() throws SQLException {
        BuildingInfo expected = new BuildingInfo("CSE2", "Bill & Melinda Gates Center for Computer Science & Engineering", 47.653060708753, -122.305107171301);
        assertEquals(buildingServiceImplementation.getBuilding("CSE2"), expected);
    }

    @Test
    public void test_getBuilding_CSE3_fail() throws SQLException {
        BuildingInfo res = buildingServiceImplementation.getBuilding("CSE3");
        assertNull(res);
        BuildingInfo expected = new BuildingInfo("CSE2", "Bill & Melinda Gates Center for Computer Science & Engineering", 47.653060708753, -122.305107171301);
        Throwable exception = assertThrows(NullPointerException.class, () -> res.equals(expected));
        assertNull(exception.getMessage());
    }

    @Test
    public void test_getBuildings_pass() throws SQLException {
        Collection<BuildingInfo> res = buildingServiceImplementation.getAllBuildings();
        assertEquals(res.size(), 124);
    }
}
