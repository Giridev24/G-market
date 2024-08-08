import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import back from "../../assets/images/back-button.png";
import "./favorites.css";
import { baseUrl } from "../Urls";

const Favorites = () => {
  const imageStyle = { objectFit: "contain", height: "70px" };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  const fetchFavoriteItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/favorite`);
      const imageIds = response.data.map((image) => image.itemId);
      const imageDetails = await Promise.all(
        imageIds.map((imageId) => fetchItemDetails(imageId))
      );
      setImages(imageDetails.filter((item) => item !== null));
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Error loading cart items.");
      setLoading(false); 
    }
  };

  const fetchItemDetails = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item details for itemId ${id}:`, error);
      return null;
    }
  };

  const removefromFavorites = (id) => {
    axios
      .delete(`${baseUrl}/api/favorite/${id}`)
      .then((response) => {
        fetchFavoriteItems();
        console.log("Product removed from cart");
        toast.success(response.data);
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
        toast.error("Failed to remove from cart");
      });
  };

  const calculateSubtotal = () => {
    const subtotal = images.reduce((sum, image) => { 
      const price = parseFloat(image.price.replace(/,/g, ''));
      return sum + price;
    }, 0);
  
    return subtotal.toLocaleString();
  };

  return (
    <div className="cart-body">
      <div className="cart-main" >
      <div className="t p-1">
        <div className="cart-button d-flex justify-content-between">
          
            <img src={back} alt="" onClick={() => navigate(-1)} className="back-button mx-2" />
        
          <h4 className="text-danger fs-5 ms-md-5">Favorites</h4>
          <div className="total  mx-md-0">
            <h5 className="text-secondary fs-6">Subtotal : </h5>
            <h5 className="px-2 text-danger">&#8377; {calculateSubtotal()}</h5>
          </div>
        </div>
        <hr />
        {error && <p className="text-danger">{error}</p>}
        {loading ? (
          <h5 className="text-center text-warning load">Loading...</h5>
        ) : (
          <div className="cont row m-0 text-center">
            {images.map((image) => (
              <div
                key={image._id}
                className="cart-cards m-lg-2 col-12 w-100 item-container text-center border-0"
              >
                <div><div className="image mt-2">
                  <img
                    src={`data:${
                      image.img.contentType
                    };base64,${arrayBufferToBase64(image.img.data.data)}`}
                    alt={image.description}
                    style={imageStyle}
                  />
                </div>
                <div className="detail d-flex">
                  <div className="item-details w-100">
                    <h5 className="mt-2">{image.name}</h5>
                    <p className="w-25">{image.description}</p>
                    <div className="d-flex justify-content-center">
                      <h5>
                        <span className="text-sm p-0">&#8377; </span>
                        {image.price}
                      </h5>
                      <div>
                        <Link to={`/detail/${image._id}`} className="lnk">
                          <button className="btn btn-outline-success btn-sm px-1 py-0 mx-2 ms-3">
                            Buy now
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm px-1 py-0  "
                          onClick={() => removefromFavorites(image._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
              </div> <hr />
                </div></div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
      </div>
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

export default Favorites;
