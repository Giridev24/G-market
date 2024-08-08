import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";
import back from "../../assets/images/back-button.png";
import { baseUrl } from "../Urls";

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUnameChange = (e) => {
    setUname(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleUpload = async () => {
    try {
      await axios.post(`${baseUrl}/api/detail`, { name, uname, address, contact });
      console.log("Order placed successfully");
      toast.success("Order placed successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${baseUrl}/api/cards/${id}`);
        setCard(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching card details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <h4 className="text-warning" style={{ letterSpacing: "4px" }}>Loading...</h4>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!name) {
    return <div>Details not found</div>;
  }

  const { description, price, img } = card;

  return (
    <div className=" mt-0 detail-main">
     <div className="detail-child shadow">
      <img src={back} className="back d-none d-md-block shadow mb-auto mt-4 mx-0 mx-md-3" onClick={() => navigate(-1)} alt="" />
     <div className="row">
        <div className="col col-12 col-md-6  text-center m-0 p-0 my-3 my-md-0">
          <div className="cdv ">
            <div>
              <img
                src={`data:${img.contentType};base64,${arrayBufferToBase64(img.data.data)}`}
                alt={name}
              />
              <h4 className="mt-2">{name}</h4>
              <p>{description}</p>
              <h4>
                Price: <span className="text-sm">&#8377; </span>
                {price}
              </h4>
            </div>
          </div>
        </div>
        <div className=" col col-12 col-md-6 m-0 p-0">
          <div className="ofrm shadow">
            <div>
              <h1 className="text-center mb-4 text-secondary">
                Your details
              </h1>
              <div className="lns">
                <label htmlFor="name">Name:</label>
                <input
                  className="oi"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={uname}
                  onChange={handleUnameChange}
                />
              </div>
              <div className="lns">
                <label htmlFor="address">Address:</label>
                <input
                  className="oi"
                  type="text"
                  id="address"
                  placeholder="Your address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="lns">
                <label htmlFor="contact">Contact:</label>
                <input
                  className="oi"
                  type="text"
                  id="contact"
                  placeholder="Your contact"
                  value={contact}
                  onChange={handleContactChange}
                />
              </div>

              <div className="d-flex">
                <button
                  className="btn btn-info shadow mt-2 m-auto fw-bold text-white"
                  onClick={handleUpload}
                >
                  Order now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
      <ToastContainer />
    </div>
  );
};

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default Detail;
