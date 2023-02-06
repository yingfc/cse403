import GoogleMapComponent from "./GoogleMap";

function Components(){
  const uwLink: string = process.env.REACT_APP_UW_LIBRARY_RESERVATION_LINK as string;

  return (
    <div>
      <a href={uwLink}>
        <button>to reserve</button>
      </a>
      <GoogleMapComponent />
    </div>
  )
}

export default Components;