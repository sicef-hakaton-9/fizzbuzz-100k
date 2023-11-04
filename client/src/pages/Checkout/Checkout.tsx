import React from "react";
import { BiCreditCard } from "react-icons/bi";
import "./style.css";

const Checkout = () => {
  return (
    <div className="w-[100%] flex justify-start items-center flex-col pt-5 payment-page">
      <h1>Plaćanje</h1>
      <article className="selected-plan flex justify-between items-center">
        <div className="flex justify-start items-start flex-col">
          <h2>Premium</h2>
          <h4>30 sati voznje</h4>
        </div>
        <h2 className="price-to-pay">500 RSD</h2>
      </article>
      <div className="flex justify-start items-start flex-col w-[100%] mt-[5px] payment-form">
        <h2>Detalji za plaćanje</h2>
        <input
          type="number"
          name="cardNumber"
          className="w-[100%]"
          placeholder="BROJ KARTICE"
          id=""
        />
        <div className="w-100% flex justify-center items-center">
          <div>
            <input
              type="number"
              name="mm"
              placeholder="MM"
              className="w-[95px]"
              id=""
            />
            <input
              type="number"
              name="yyyy"
              placeholder="YYYY"
              className="w-[95px] ml-[8px]"
              id=""
            />
          </div>
          <BiCreditCard color="#cfcece" size={35} className="mx-[8px]" />
          <input
              type="number"
              name="cvv"
              placeholder="CVV"
              className="w-[110px]"
              id=""
            />
        </div>
        <input
          type="number"
          name="cardHolderName"
          className="w-[100%]"
          placeholder="VLASNIK KARTICE"
          id=""
        />
      </div>
    </div>
  );
};

export default Checkout;
