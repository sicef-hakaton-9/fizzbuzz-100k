import React, { useState, useEffect } from "react";
import "../style.css";
import { IParkingLot } from "../../../models/parking-lot";
import DestinationParkingIsScheduled from "./DestinationParkingIsScheduled";
import { ApiService } from "../../../services/api.service";

interface IComponentProps {
  parkingLot: IParkingLot;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleDestinationParkingLot: React.FC<IComponentProps> = ({
  parkingLot,
  isOpen,
}) => {
  const [renderReservedScreen, setRenderReservedStatus] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleReserve = async () => {
    const { data, ok } = await ApiService.reserveParkingLotAsync(parkingLot.id);
    setRenderReservedStatus(ok);

    if (ok === false) {
      setError(data);

      setTimeout(() => {
        setError(data);
      }, 2000);
    }
  };

  useEffect(() => {
    if (isOpen === false) {
      setRenderReservedStatus(false);
    }
  }, [isOpen]);

  return (
    <div className="w-[100%] p-[10px] flex justify-start items-center flex-col scheduler-sheet">
      {renderReservedScreen ? (
        <DestinationParkingIsScheduled parkingLot={parkingLot} />
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
          {error !== "" && <p className="text-red-500">{error}</p>}
          <button className="action-sheet-button" onClick={handleReserve}>
            REZERVIŠI MESTO
          </button>
        </>
      )}
    </div>
  );
};

export default ScheduleDestinationParkingLot;
