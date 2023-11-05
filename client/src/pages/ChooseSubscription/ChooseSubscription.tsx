import React, { useState, useLayoutEffect } from "react";
import "../ChooseSubscription/style.css";
import { ISubscription } from "../../models/subscriptions";
import { ApiService } from "../../services/api.service";
import {
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { selectPlan } from "../../redux/reducers/subscription.reducer";
import { formatDuration, formatDurationText } from "../../helpers/data.helper";

const ChooseSubscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubscription = (subscription: ISubscription) => {
    dispatch(selectPlan(subscription));
    navigate("/checkout");
  };

  useLayoutEffect(() => {
    (async () => {
      const { data } = await ApiService.getSubscriptionsAsync();
      setSubscriptions(data.subscriptionPlans);
    })();
  }, []);

  return (
    <div className="w-[100%] flex justify-start items-center flex-col pt-5">
      <h1 className="choose-plan">Izaberite plan</h1>
      <div className="status-bar">
        <div className="status">
          <BsFill1CircleFill color="#d70466" size={25} />
          <p>Registracija</p>
        </div>
        <div className="status">
          <BsFill2CircleFill color="#d70466" size={25} />
          <p>Odabir plana</p>
        </div>
        <div className="status">
          <BsFill3CircleFill color="#444" size={25} />
          <p>Plaćanje</p>
        </div>
      </div>
      <div className="pb-[10px] w-[4px]"></div>
      {subscriptions.map((data, i) => (
        <article
          key={i}
          className="w-[85%] p-3 flex justify-around items-center flex-col text-center plan"
        >
          <h1>{data.name}</h1>
          <p>
            <sub style={{ fontSize: 14 }}>cena</sub>
            {data.price} RSD
          </p>
          <h3>
            Dobijate {formatDuration(data.minutes)}{" "}
            {formatDurationText(data.minutes)} voznje u toku ovog meseca
          </h3>
          <button className="btn-plan" onClick={() => handleSubscription(data)}>
            IZABERI
          </button>
        </article>
      ))}
    </div>
  );
};

export default ChooseSubscription;
