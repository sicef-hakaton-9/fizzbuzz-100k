import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsMap } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import "./style.css";
import { useNavigate, useLocation } from "react-router";

interface IComponentProps {
  isMapView?: boolean;
}

const Footer: React.FC<IComponentProps> = ({ isMapView = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer
      className="footer w-[100%] bg-white flex justify-between items-center py-[15px] px-[35px]"
      style={isMapView ? { paddingTop: 28 } : {}}
    >
      <BsMap
        size={30}
        className={pathname === "/map" ? "active" : ""}
        onClick={() => navigate("/map")}
      />
      <AiOutlineUnorderedList
        size={30}
        className={pathname === "/leaderboard" ? "active" : ""}
        onClick={() => navigate("/leaderboard")}
      />
      <BiUser
        className={pathname === "/account" ? "active" : ""}
        size={30}
        onClick={() => navigate("/account")}
      />
    </footer>
  );
};

export default Footer;
