import React, { useState } from "react";
import { ApiService } from "../../../services/api.service";

interface IComponentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bind: () => any;
}

const Start: React.FC<IComponentProps> = ({ setIsOpen, bind }) => {
  const [bikeCode, setBikeCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const start = async () => {
    const { data, ok } = await ApiService.rentABikeAsync(bikeCode);

    if (!ok) {
      setError(data);

      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    setError("success");
    await bind();
  };

  return (
    <>
      {error !== "success" ? (
        <>
          <h1>Pokreni vožnju</h1>
          <h2 style={{ marginTop: 15 }}>
            Da bi ste pokrenuli vožnju neophodno je uneti kod sa bicikle.
          </h2>
          <input
            type="text"
            className="enter-code w-[100%]"
            placeholder="Kod bicikle"
            onChange={(e) => setBikeCode(e.target.value)}
          />
          {error !== "" && error !== "success" && (
            <p className="text-red-500">{error}</p>
          )}
          <button className="action-sheet-button start-action" onClick={start}>
            START
          </button>
        </>
      ) : (
        <>
          <h1>Bicika je uspešno iznajmljena.</h1>
          <button
            className="action-sheet-button"
            onClick={() => setIsOpen(false)}
          >
            ZATVORI
          </button>
        </>
      )}
    </>
  );
};

export default Start;
