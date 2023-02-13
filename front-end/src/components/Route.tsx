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
    srcLocation: BuildingInfo,
    dstLocation: BuildingInfo,
) {
    directionsService
        .route({
            origin: { lat: srcLocation.latitude, lng: srcLocation.longitude},
            destination: { lat: dstLocation.latitude, lng: dstLocation.longitude},
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
            console.log(response);
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed."));
}