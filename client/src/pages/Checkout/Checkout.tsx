import React from "react";
import { BiCreditCard } from "react-icons/bi";
import {
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";
import "./style.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatDuration, formatDurationText } from "../../helpers/data.helper";

const Checkout = () => {
  const navigate = useNavigate();

  const subscription = useSelector(
    (state: RootState) => state.subscription.value
  );

  return (
    <div className="w-[100%] flex justify-start items-center flex-col pt-5 payment-page">
      <h1>Plaćanje</h1>
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
          <BsFill3CircleFill color="#d70466" size={25} />
          <p>Plaćanje</p>
        </div>
      </div>
      <article className="selected-plan flex justify-between items-center">
        <div className="flex justify-start items-start flex-col">
          <h2>{subscription?.name}</h2>
          <h4>
            {formatDuration(subscription?.minutes ?? 0)} {" "}
            {formatDurationText(subscription?.minutes ?? 0)} vožnje
          </h4>
        </div>
        <h2 className="price-to-pay">{subscription?.price} RSD</h2>
      </article>
      <div className="flex justify-start items-start flex-col w-[100%] payment-form">
        <h2>Detalji za plaćanje</h2>
        <input
          type="number"
          name="cardNumber"
          className="w-[100%]"
          placeholder="BROJ KARTICE"
        />
        <div className="w-100% flex justify-center items-center">
          <div>
            <input
              type="number"
              name="mm"
              placeholder="MM"
              className="w-[95px]"
            />
            <input
              type="number"
              name="yyyy"
              placeholder="YYYY"
              className="w-[95px] ml-[8px]"
            />
          </div>
          <BiCreditCard
            color="#cfcece"
            size={35}
            className="mx-[8px] mt-[7px]"
          />
          <input
            type="number"
            name="cvv"
            placeholder="CVV"
            className="w-[110px]"
          />
        </div>
        <input
          type="text"
          name="cardHolderName"
          className="w-[100%]"
          placeholder="VLASNIK KARTICE"
        />
        <div className="mt-[10px] w-[100%] flex justify-end items-center checkout-btns">
          <button onClick={() => navigate("/choose-subscription")}>
            NAZAD
          </button>
          <button onClick={() => navigate("/account")}>PLATI</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
