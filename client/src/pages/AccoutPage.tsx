import Header from "../components/AccountPage/Header/Header";
import Card from "../components/AccountPage/Card/Card";
import CurrentPlan from "../components/AccountPage/CurrentPlan/CurrentPlan";
import Footer from "../components/Footer/Footer";
import { useState, useLayoutEffect } from "react";
import { ApiService } from "../services/api.service";
import BottomSheet from "../components/html/BottomSheet/BottomSheet";

const AccoutPage: React.FC = () => {
  const [isInDrive, setIsInDrive] = useState<boolean>(false);
  const [renderSheet, setRenderSheet] = useState<boolean>(false);
  const [renderMsg, setRenderMsg] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  useLayoutEffect(() => {
    (async () => {
      const { data } = await ApiService.getUserRideStatusAsync();
      setIsInDrive(data?.currentRide !== null);
    })();
  }, []);

  const handleSubmit = async () => {
    await ApiService.reportProblemInRideAsync(comment);
    setRenderMsg(true);
  };

  return (
    <>
      <main>
        <Header />
        <Card />
        <CurrentPlan />
        {isInDrive && (
          <div className="w-[100%] flex justify-start items-start pl-[20px]">
            <p
              className="text-3xl text-[#d70466]"
              onClick={() => setRenderSheet(true)}
            >
              Prijavite problem tokom vožnje?
            </p>
          </div>
        )}
      </main>
      <Footer />
      <BottomSheet isOpen={renderSheet} setIsOpen={setRenderSheet}>
        <div className="payment-form w-[100%]">
          {!renderMsg ? (
            <>
              <div className="text-center w-[100%]">
                <h1 style={{ fontSize: 25 }}>Prijavite problem</h1>
              </div>
              <textarea
                rows={5}
                name="comment"
                placeholder="Unesite komentar"
                className="mt-[15px] w-[100%]"
                style={{
                  borderRadius: 10,
                }}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="action-sheet-button" onClick={handleSubmit}>
                POŠALJI
              </button>
            </>
          ) : (
            <div className="text-center w-[100%]">
              <p style={{ fontSize: 20}}>
                Hvala što ste prijavili problem. Obratiće vam se uskoro neko od
                naših operatera.
              </p>
              <button
                className="action-sheet-button"
                onClick={() => {
                  setRenderSheet(false);
                  setComment("");
                  setRenderMsg(false);
                }}
              >
                ZATVORI
              </button>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
};
export default AccoutPage;
