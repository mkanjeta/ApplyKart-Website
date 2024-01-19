// for map
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Icon from "./Icon";
import ReactDOMServer from "react-dom/server";
export default function Map(props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<Icon />),
  });
  return (
    <MapContainer center={[props.mapLat, props.mapLong]} zoom={13}>
      <TileLayer
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=f6c40ae7-7805-4b20-832b-38c1f52667ac`}
        attribution="Map data &copy; <a>Mapbox</a>"
      />
      <Marker
        icon={icon}
        position={[props.mapLat, props.mapLong]}
        draggable={false}
        animate={true}
      >
        {/* <Popup>Test Popup</Popup> */}
      </Marker>
    </MapContainer>
  );
}
