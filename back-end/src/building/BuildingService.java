package building;

import spark.QueryParamsMap;

import java.util.Collection;

public interface BuildingService {
    public Collection<BuildingInfo> getAllBuildings();

    public BuildingInfo getBuilding(String building_abbr);

    public BuildingInfo getBuildingFromClass(QueryParamsMap paramsMap);
}
