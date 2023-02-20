package dining;

public class DiningInfo {
    private String buildingAbbr;
    private String buildingFullName;
    private String diningName;
    private String diningType;
    private double latitude;
    private double longitude;

    public DiningInfo(String buildingAbbr, String buildingFullName, String diningName, String diningType, double latitude, double longitude) {
        this.buildingAbbr = buildingAbbr;
        this.buildingFullName = buildingFullName;
        this.diningName = diningName;
        this.diningType = diningType;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getBuildingAbbr() {
        return buildingAbbr;
    }

    public void setBuildingAbbr(String buildingAbbr) {
        this.buildingAbbr = buildingAbbr;
    }
    public String getBuildingFullName() {
        return buildingFullName;
    }

    public void setBuildingFullName(String buildingFullName) {
        this.buildingFullName = buildingFullName;
    }

    public String getDiningName() {
        return diningName;
    }

    public void setDiningName(String diningName) {
        this.diningName = diningName;
    }

    public String getDiningType() {
        return diningType;
    }

    public void setDiningType(String diningType) {
        this.diningType = diningType;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

}
