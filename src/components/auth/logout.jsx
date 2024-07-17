import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutImg from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={LogoutImg} alt="Logout" />
    </button>
  );
};

export default Logout;
