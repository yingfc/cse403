package dining;

import java.util.Collection;
import java.util.List;

public class DiningInfo {
    public static enum Weekday {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }
    public static class OperationTime {
        public final Weekday day;
        public final String openTime;
        public final String closeTime;
        public OperationTime (Weekday day, String openTime, String closeTime) {
            this.day = day;
            this.openTime = openTime;
            this.closeTime = closeTime;
        }
    }
    private Collection<OperationTime> timeList;
    private String buildingAbbr;
    private String diningName;
    private String diningType;
    private double latitude;
    private double longitude;
    private boolean isOpen;

    public DiningInfo(String buildingAbbr, String diningName, String diningType, double latitude, double longitude, Collection<OperationTime> timeList) {
        this.buildingAbbr = buildingAbbr;
        this.diningName = diningName;
        this.diningType = diningType;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timeList = timeList;
        isOpen = false;
    }

    public String getBuildingAbbr() {
        return buildingAbbr;
    }

    public void setBuildingAbbr(String buildingAbbr) {
        this.buildingAbbr = buildingAbbr;
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

    public Collection<OperationTime> getOperationTime() {
        return timeList;
    }

    public void setTimeList(Collection<OperationTime> timeList) {
        this.timeList = timeList;
    }

    public void setIsOpen(boolean isOpen) {
        this.isOpen = isOpen;
    }

    public boolean getIsOpen() {
        return this.isOpen;
    }
}
