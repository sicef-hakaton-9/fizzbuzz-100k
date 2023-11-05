import React, { useState, useEffect } from "react";
import "../style.css";
import { IParkingLot } from "../../../models/parking-lot";
import BikeIsWaiting from "../Other/BikeIsWaiting";
import { ApiService } from "../../../services/api.service";

interface IComponentProps {
  parkingLot: IParkingLot;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bind: () => any;
}

const ScheduleRide: React.FC<IComponentProps> = ({
  parkingLot,
  isOpen,
  setIsOpen,
  bind,
}) => {
  const [renderReservedScreen, setRenderReservedStatus] =
    useState<boolean>(false);
  const [bikeCode, setBikeCode] = useState<string>("");

  const handleReserve = async () => {
    const { data } = await ApiService.reserveBikeAsync(parkingLot.id);

    setBikeCode(data.bikeCode);
    setRenderReservedStatus(true);
  };

  useEffect(() => {
    if (isOpen === false) {
      setRenderReservedStatus(false);
      setBikeCode("");
    }
  }, [isOpen]);

  return (
    <div className="w-[100%] p-[10px] flex justify-start items-center flex-col scheduler-sheet">
      {renderReservedScreen ? (
        <BikeIsWaiting
          setIsOpen={setIsOpen}
          parkingLot={parkingLot}
          bikeCode={bikeCode}
          bind={bind}
        />
      ) : (
        <>
          <h1>{parkingLot.name}</h1>
          <div className="w-[100%] flex justify-around items-start gap-[10px]">
            <div className="sheet-block flex justify-center items-center flex-col">
              <h3>Slobodna mesta</h3>
              <h2>{parkingLot.free_spaces}</h2>
            </div>
            <div className="sheet-block flex justify-center items-center flex-col">
              <h3>Slobodne bicikle</h3>
              <h2>{parkingLot.total_spaces - parkingLot.free_spaces}</h2>
            </div>
          </div>
          <button
            className="action-sheet-button"
            style={
              parkingLot.total_spaces - parkingLot.free_spaces === 0
                ? { opacity: "0.5" }
                : {}
            }
            disabled={parkingLot.total_spaces - parkingLot.free_spaces === 0}
            onClick={handleReserve}
          >
            REZERVIŠI BICIKLU
          </button>
        </>
      )}
    </div>
  );
};

export default ScheduleRide;
