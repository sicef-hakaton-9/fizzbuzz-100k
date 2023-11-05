import React from "react";
import { IParkingLot } from "../../../models/parking-lot";
import "../style.css";

interface IComponentProps {
  parkingLot: IParkingLot;
}

const DestinationParkingIsScheduled: React.FC<IComponentProps> = ({
  parkingLot,
}) => {
  return (
    <>
      <h1>{parkingLot.name}</h1>
      <h2 className="waiting-headline">Mesto je rezervisano.</h2>
      <h2 className="waiting-headline" style={{ marginTop: 10 }}>
        Rezervacija važi do:
      </h2>
      <h2 className="waiting-headline">10:30</h2>
      <button className="action-sheet-button end-action">ZAVRŠI VOŽNJU</button>
    </>
  );
};

export default DestinationParkingIsScheduled;
