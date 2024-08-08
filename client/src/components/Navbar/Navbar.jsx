import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import basket from "../../assets/images/basket.png";
import brand from "../../assets/images/star2.png"
import search from "../../assets/images/search2.png"
import favorites from "../../assets/images/favorites2.png"
import admin from "../../assets/images/admin1.png"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import { baseUrl } from "../Urls";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(searchQuery)}`); 
  };

  return (
    <div className="main-nav">
      <div className="row text-white py-2 shadow">
        <div className="col col-4 col-md-3">
          <Link to="/" className="navbar-brand">
            <img src={brand} alt="" className="mx-1 mx-md-5" />
          </Link>
          <Link to="/login" className="navbar-brand">
            <img src={admin} alt="" className="mx-3 mx-md-0" />
          </Link>
        </div>
        <div className="col col-4 col-md-6">
          <div className=''>
            <form className="d-flex align-items-center" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control  text-white"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button className="btn btn-outline-none" type="submit">
                <img src={search} alt="Search" />
              </button>
            </form>
          </div>
        </div>
        <div className="col col-4 col-md-3">
          <div href="/" className="navbar-brand">
            <div>
              <Link to="/favorites"><img src={favorites} alt="" className="mx-1 mx-md-3" /></Link>
              <Link to="/Cart"><img src={basket} alt="" className="mx-1" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;