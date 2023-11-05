import React, { useState } from "react";
import { ApiService } from "../../../services/api.service";

interface IComponentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bind: () => any;
}

const Finish: React.FC<IComponentProps> = ({ setIsOpen, bind }) => {
  const [finished, setFinished] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFinish = async () => {
    navigator.geolocation.getCurrentPosition(
      async (navData) => {
        const { latitude, longitude } = navData.coords;

        const { data, ok } = await ApiService.finishRideAsync(
          longitude,
          latitude
        );

        setFinished(ok);

        await bind();

        if (!ok) {
          setError(data);

          setTimeout(() => {
            setError("");
          }, 2000);
        }
      },
      () => {}
    );
  };

  return (
    <div className="w-[100%] p-[10px] flex justify-start items-center flex-col scheduler-sheet">
      {finished === false ? (
        <>
          <h1>Da li ste sigurni da želite da završite vožnju?</h1>
          {error !== "" && <p className="text-red-500">{error}</p>}
          <button
            className="action-sheet-button end-action"
            onClick={handleFinish}
          >
            ZAVRŠI
          </button>
        </>
      ) : (
        <div>
          <h1>Uspešno ste završili vožnju.</h1>
          <button
            className="action-sheet-button"
            onClick={() => setIsOpen(false)}
          >
            ZATVORI
          </button>
        </div>
      )}
    </div>
  );
};

export default Finish;
