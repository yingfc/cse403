import building.BuildingService;
import building.BuildingServiceImplementation;
import com.google.gson.Gson;
import response.StandardResponse;
import response.StatusResponse;

import static spark.Spark.*;
public class SparkJavaDemo {
    public static void main(String[] args) {
        final BuildingService buildingService = new BuildingServiceImplementation();

        get("/hello", (req, res) -> "hi there, this is SparkJava backend service for DubMap.");
        get("/buildings", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(
                new StandardResponse(StatusResponse.SUCCESS, new Gson().toJsonTree(buildingService.getAllBuildings()))
            );
        });
        get("/building/:abbr", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(
                    new StandardResponse(StatusResponse.SUCCESS, new Gson().toJsonTree(buildingService.getBuilding(req.params(":abbr"))))
            );
        });

        get("/class", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(
                    new StandardResponse(StatusResponse.SUCCESS, new Gson().toJsonTree(buildingService.getBuildingFromClass(req.queryMap())))
            );
        });
    }
}
