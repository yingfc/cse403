package building;

import java.util.Objects;

public class BuildingInfo {
    private String buildingAbbr;
    private String buildingFullName;;
    private double latitude;
    private double longitude;

    public BuildingInfo(String buildingAbbr, String buildingFullName, double latitude, double longitude) {
        this.buildingAbbr = buildingAbbr;
        this.buildingFullName = buildingFullName;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BuildingInfo)) return false;
        BuildingInfo that = (BuildingInfo) o;
        return Double.compare(that.latitude, latitude) == 0 && Double.compare(that.longitude, longitude) == 0 && buildingAbbr.equals(that.buildingAbbr) && buildingFullName.equals(that.buildingFullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(buildingAbbr, buildingFullName, latitude, longitude);
    }
}
