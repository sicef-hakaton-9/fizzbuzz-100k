import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MapView from "../pages/MapView/MapView";
import AccoutPage from "../pages/AccoutPage";
import ChooseSubscription from "../pages/ChooseSubscription/ChooseSubscription";
import Checkout from "../pages/Checkout/Checkout";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Plans from "../pages/ChooseSubscription/ChooseSubscription";
import SignIn from "../pages/Sign-in/Sign-in";
import CreateAcc from "../pages/Create-Acc/CreateAcc";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/map" Component={MapView} />
        <Route path="/account" element={<ProtectedRoute component={<AccoutPage />} />} />
        <Route path="/choose-subscription" Component={ChooseSubscription} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/leaderboard" Component={Leaderboard} />
        <Route path="/plans" Component={Plans} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/create-acc" Component={CreateAcc} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
