import {BuildingInfo} from "./index";

export function calculateAndDisplayRouteDemo(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
) {
    directionsService
        .route({
            origin: { lat: 47.65578098354366, lng: -122.30784174832523},
            destination: { lat: 47.65303982982676, lng: -122.30864914593757},
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
            console.log(response);
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed."));
}

export function calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    srcLat: number,
    srcLong: number,
    dstLocation: BuildingInfo,
) {
    directionsService
        .route({
            origin: { lat: srcLat, lng: srcLong},
            destination: { lat: dstLocation.latitude, lng: dstLocation.longitude},
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
            console.log(response);
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed." + e));
}

export class GeoService {
    public pos: any
    public currLat: number | undefined
    public currLong: number | undefined
    public getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('Your current position is:');
            console.log(`Latitude : ${position.coords.latitude}`);
            console.log(`Longitude: ${position.coords.longitude}`);
            console.log(`More or less ${position.coords.accuracy} meters.`);
            this.pos = position;
            this.currLat = position.coords.latitude;
            this.currLong = position.coords.longitude;
        })
    }
}