package building;

import java.util.Collection;

public interface BuildingService {
    public Collection<BuildingInfo> getAllBuildings();

    public BuildingInfo getBuilding(String building_abbr);
}
