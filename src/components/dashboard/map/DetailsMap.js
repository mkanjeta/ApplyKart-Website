import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { BASE_URL } from "constants/constants";
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
const colorOptions = { color: "var(--color-one)" };
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Icon from "./Icon";

export default function DetailsMap(props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [position, setPosition] = useState(() => []);
  const [office, setOffice] = useState(() => []);
  const [hasLocation, setHasLocation] = useState(() => true);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  // console.log(props);

  useEffect(() => {
    if (coords && typeof coords != 'undefined' && props?.latLong) {
      if (props?.setEtas) {
        axios
          .post(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${props?.latLong?.office[0]}%2C${props?.latLong?.office[1]}&origins=${coords?.latitude}%2C${coords?.longitude}&key=${apiKey}&mode=walking`
          )
          .then((response) => {
            props.setEtas((prev) => {
              return {
                ...prev,
                walk: response?.data?.rows[0]?.elements[0]?.duration?.text,
              };
            });
          })
          .catch((err) => {
            // console.log(err);
          });

        axios
          .post(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${props?.latLong?.office[0]}%2C${props?.latLong?.office[1]}&origins=${coords?.latitude}%2C${coords?.longitude}&key=${apiKey}`
          )
          .then((response) => {
            props.setEtas((prev) => {
              return {
                ...prev,
                drive: response?.data?.rows[0]?.elements[0]?.duration?.text,
              };
            });
          })
          .catch((err) => {
            // console.log(err);
          });

        axios
          .post(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${props?.latLong?.office[0]}%2C${props?.latLong?.office[1]}&origins=${coords?.latitude}%2C${coords?.longitude}&key=${apiKey}&mode=bicycling`
          )
          .then((response) => {
            props.setEtas((prev) => {
              return {
                ...prev,
                bike: response?.data?.rows[0]?.elements[0]?.duration?.text,
              };
            });
          })
          .catch((err) => {
            // console.log(err);
          });

        axios
          .post(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${props?.latLong?.office[0]}%2C${props?.latLong?.office[1]}&origins=${coords?.latitude}%2C${coords?.longitude}&key=${apiKey}&mode=transit`
          )
          .then((response) => {
            props.setEtas((prev) => {
              return {
                ...prev,
                bus: response?.data?.rows[0]?.elements[0]?.duration?.text,
              };
            });
          })
          .catch((err) => {
            // console.log(err);
          });
      }
      setPosition([coords?.latitude, coords?.longitude]);
      // console.log('--->lat lon<--', props?.latLong?.office)
      setOffice(props?.latLong?.office ? [...props?.latLong?.office] : [-37.840935, 144.946457]);
      // console.log('Has Location');
      setHasLocation(true);
    } else {
      setHasLocation(false);
      setPosition([-37.840935, 144.946457]);
      setOffice(props?.latLong?.office ? [...props?.latLong?.office] : [-37.840935, 144.946457]);
    }
  }, [coords, props?.latLong]);

  const apiIsLoaded = (map, maps) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = { lat: position[0], lng: position[1] };
    const destination = {
      lat: office[0],
      lng: office[1],
    };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  // console.log('office', office);

  // console.log(position, office, hasLocation)

  if(office && office?.length == 0) {
    return null;
  }

  return (position.length && office.length && hasLocation) ? (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={{ lat: office[0], lng: office[1] }}
        zoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        <Icon lat={position[0]} lng={position[1]} text={`You're here!!`} />
      </GoogleMapReact>
    </>
  ) : (
    <>
      {!hasLocation && (
        <span style={{ color: "red" }}>Location permission required</span>
      )}
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={{ lat: office[0], lng: office[1] }}
        zoom={15}
      // defaultZoom={15}
      // yesIWantToUseGoogleMapApiInternals
      // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        <Icon lat={office[0]} lng={office[1]} text={`You're here!!`} />
      </GoogleMapReact>
    </>
  );
}
