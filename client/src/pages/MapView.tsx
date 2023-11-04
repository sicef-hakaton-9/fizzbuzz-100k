import React, { useState, useLayoutEffect } from "react";

import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Environment } from "../common/environment";
import { IParkingLot } from "../models/parking-lot";
import { ApiService } from "../services/api.service";
import { IoMdPin } from "react-icons/io";

const MapView: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<IParkingLot[]>([]);

  const [viewport, setViewport] = useState<any>({
    width: "100%",
    height: "100%",
    latitude: Number("43.32093"),
    longitude: Number("21.89574"),
    zoom: 12,
  });

  useLayoutEffect(() => {
    (async () => {
      const { data } = await ApiService.getParkingLotsAsync();
      setParkingLots(data.parkingLots);
    })();
  }, []);

  return (
    <section className="w-[100%] h-[100vh]">
      <Map
        mapStyle={Environment.mapboxStyleUrl}
        accessToken={Environment.mapboxAccessToken}
        style={{ width: "100%", height: "100vh" }}
        initialViewState={{ ...viewport }}
      >
        {parkingLots.map((lot, i) => (
          <Marker
            longitude={Number(lot.longitude)}
            latitude={Number(lot.latitude)}
            key={i}
          >
          <IoMdPin size={35} color="#fff" />
          </Marker>
        ))}
      </Map>
    </section>
  );
};

export default MapView;
