import GoogleMapComponent from "./GoogleMap";
import BuildingGenerator from "./BuildingGenerator";

function Components(){
  const uwLink: string = process.env.REACT_APP_UW_LIBRARY_RESERVATION_LINK as string;

  return (
    <div id="map">
        <a href={uwLink}>
            <button>to reserve</button>
        </a>
        <a>
            <button id='route' value="Get Route" >Get Route</button>
        </a>
      <GoogleMapComponent />
      {/*<BuildingGenerator />*/}
    </div>
  )
}

export default Components;