import React, { useState, useLayoutEffect, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Environment } from "../../common/environment";
import { IParkingLot } from "../../models/parking-lot";
import { ApiService } from "../../services/api.service";
import { IoMdPin } from "react-icons/io";
import BottomSheet from "../../components/html/BottomSheet/BottomSheet";
import ScheduleRide from "../../components/Map/Start/ScheduleRide";
import ScheduleDestinationParkingLot from "../../components/Map/Stop/ScheduleDestinationParkingLot";
import Footer from "../../components/Footer/Footer";
import "./style.css";
import Start from "../../components/Map/Start/Start";
import { PiPersonSimpleBikeFill } from "react-icons/pi";
import Finish from "../../components/Map/Stop/Finish";

const MapView: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<IParkingLot[]>([]);
  const [showButtomSheet, setShowButtomSheet] = useState<boolean>(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<any>(<></>);
  const [isInDrive, setIsInDrive] = useState<boolean>(false);
  const [currentCords, setCurrentCords] = useState<any>(null);

  const bindData = async () => {
    const [parkingLotsData, userRideStatus] = await Promise.all([
      ApiService.getParkingLotsAsync(),
      ApiService.getUserRideStatusAsync(),
    ]);

    setParkingLots(parkingLotsData.data.parkingLots);

    setIsInDrive(userRideStatus?.data?.currentRide !== null);
  };

  useLayoutEffect(() => {
    (async () => {
      await bindData();
      navigator.geolocation.getCurrentPosition((data) =>
        setCurrentCords(data.coords)
      );
    })();
  }, []);

  useEffect(() => {
    if (showButtomSheet === false) {
      setTimeout(() => {
        setBottomSheetContent(<></>);
      }, 250);
    }
  }, [showButtomSheet]);

  return (
    <>
      <section className="w-[100%] h-[100vh]">
        <Map
          mapStyle={Environment.mapboxStyleUrl}
          accessToken={Environment.mapboxAccessToken}
          style={{ width: "100%", height: "100vh" }}
          initialViewState={{
            latitude: Number("43.32093"),
            longitude: Number("21.89574"),
            zoom: 12,
          }}
        >
          {parkingLots.map((lot, i) => (
            <Marker
              longitude={Number(lot.longitude)}
              latitude={Number(lot.latitude)}
              key={i}
              onClick={() => {
                if (isInDrive) {
                  setBottomSheetContent(
                    <ScheduleDestinationParkingLot
                      parkingLot={lot}
                      isOpen={showButtomSheet}
                      setIsOpen={setShowButtomSheet}
                    />
                  );
                } else {
                  setBottomSheetContent(
                    <ScheduleRide
                      bind={bindData}
                      parkingLot={lot}
                      isOpen={showButtomSheet}
                      setIsOpen={setShowButtomSheet}
                    />
                  );
                }

                setShowButtomSheet(true);
              }}
            >
              <IoMdPin size={35} color="#fff" />
            </Marker>
          ))}
          {isInDrive && (
            <Marker
              longitude={Number(currentCords?.longitude ?? 0)}
              latitude={Number(currentCords?.latitude ?? 0)}
            >
              <PiPersonSimpleBikeFill size={35} color="#ff9c1c" />
            </Marker>
          )}
        </Map>
      </section>
      <BottomSheet isOpen={showButtomSheet} setIsOpen={setShowButtomSheet}>
        {bottomSheetContent}
      </BottomSheet>
      {isInDrive === false && (
        <button
          className="start-ride"
          onClick={() => {
            setBottomSheetContent(
              <div className="w-[100%] p-[10px] flex justify-start items-center flex-col scheduler-sheet">
                <Start setIsOpen={setShowButtomSheet} bind={bindData} />
              </div>
            );
            setShowButtomSheet(true);
          }}
        >
          ZAPOČNI VOŽNJU
        </button>
      )}

      {isInDrive === true && (
        <button
          className="start-ride end-drive"
          onClick={() => {
            setBottomSheetContent(
              <Finish setIsOpen={setShowButtomSheet} bind={bindData} />
            );
            setShowButtomSheet(true);
          }}
        >
          ZAVRŠI VOŽNJU
        </button>
      )}

      <Footer isMapView />
    </>
  );
};

export default MapView;
