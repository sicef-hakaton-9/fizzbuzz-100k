import React from "react";
import "../ChooseSubscription/style.css"

const ChooseSubscription: React.FC = () => {
  return (
    <div className="w-[100%] flex justify-start items-center flex-col pt-5">
      <h1 className="mb-5 choose-plan">Izaberite plan</h1>
      <article className="w-[85%] p-3 flex justify-around items-center flex-col text-center plan">
        <h1>Osnovni</h1>

        <p><sub style={{ fontSize: 14 }}>cena</sub>500 RSD</p>
        <h3>Dobijate 30 sati voznje u toku ovog meseca</h3>
        <button className="btn-plan">IZABERI</button>
      </article>

      <article className="w-[85%] p-3 flex justify-around items-center flex-col text-center plan">
        <h1>Standard</h1>

        <p><sub style={{ fontSize: 14 }}>cena</sub>500 RSD</p>
        <h3>Dobijate 30 sati voznje u toku ovog meseca</h3>
        <button className="btn-plan">IZABERI</button>
      </article>

      <article className="w-[85%] p-3 flex justify-around items-center flex-col text-center plan">
        <h1>Premium</h1>

        <p><sub style={{ fontSize: 14 }}>cena</sub>500 RSD</p>
        <h3>Dobijate 30 sati voznje u toku ovog meseca</h3>
        <button className="btn-plan">IZABERI</button>
      </article>
    </div>
  );
};

export default ChooseSubscription;
