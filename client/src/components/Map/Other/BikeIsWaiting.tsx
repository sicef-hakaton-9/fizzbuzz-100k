import React, { useState } from "react";
import "../style.css";
import { IParkingLot } from "../../../models/parking-lot";
import Start from "../Start/Start";

interface IComponentProps {
  parkingLot: IParkingLot;
  bikeCode: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bind: () => any;
}

const BikeIsWaiting: React.FC<IComponentProps> = ({
  parkingLot,
  bikeCode,
  setIsOpen,
  bind,
}) => {
  const [renderStart, setRenderStart] = useState<boolean>(false);

  return (
    <>
      {renderStart ? (
        <Start setIsOpen={setIsOpen} bind={bind} />
      ) : (
        <>
          <h1>{parkingLot.name}</h1>
          <h2 className="waiting-headline">Bicikla te čeka!</h2>
          <h2 className="waiting-headline">Broj bicikle:</h2>
          <h3 className="bike-code">{bikeCode}</h3>
          <h2 className="waiting-headline" style={{ marginTop: 10 }}>
            Rezervacija važi do:
          </h2>
          <h2 className="waiting-headline">10:30</h2>
          <button
            className="action-sheet-button"
            onClick={() => setRenderStart(true)}
          >
            ZAPOČNI VOŽNJU
          </button>
        </>
      )}
    </>
  );
};

export default BikeIsWaiting;
