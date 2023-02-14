package building;

public class DiningInfo extends BuildingInfo {
    
    private String diningName;
    
    public DiningInfo(String buildingAbbr, String buildingFullName, String diningName, double latitude, double longitude) {
        super(buildingAbbr, buildingFullName, latitude, longitude);
        this.diningName = diningName;
    }
    
    public String getDiningName() {
        return diningName;
    }
    
    public void setDiningName(String diningName) {
        this.diningName = diningName;
    }
}
