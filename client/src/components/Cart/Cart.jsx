import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import back from "../../assets/images/back-button.png";
import "./cart.css";
import { baseUrl } from "../Urls";

const Cart = () => {
  const imageStyle = { objectFit: "contain", height: "70px" };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/cart`);
      const imageIds = response.data.map((image) => image.itemId);
      const imageDetails = await Promise.all(
        imageIds.map((imageId) => fetchItemDetails(imageId))
      );
      setImages(imageDetails.filter((item) => item !== null));
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Error loading cart items.");
      setLoading(false); // Set loading to false on error
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

  const removefromCart = (id) => {
    axios
      .delete(`${baseUrl}/api/cart/${id}`)
      .then((response) => {
        fetchCartItems();
        console.log("Product removed from cart");
        toast.success("Removed from cart");
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
      <div className="t p-1 ">
        <div className="cart-button d-flex justify-content-between">
          
            <img src={back} alt="" onClick={() => navigate(-1)} className="back-button mx-2" />
          
          <h4 className="text-secondary fs-5">Your cart</h4>
          <div className="total  mx-md-0">
            <h5 className="text-secondary fs-6">Subtotal : </h5>
            <h5 className="px-2 text-primary">&#8377; {calculateSubtotal()}</h5>
          </div>
        </div>
        <hr />
        {error && <p className="text-danger">{error}</p>}
        {loading ? (
          <h5 className="text-center text-warning load">Loads in 50 secs...</h5>
        ) : (
          <div className="cont row m-0 ">
            {images.map((image) => (
              <div
                key={image._id}
                className="cart-cards m-lg-2 col-6 col-lg-4 item-container text-center"
              >
                <div className="image mt-2">
                  <img
                    src={`data:${
                      image.img.contentType
                    };base64,${arrayBufferToBase64(image.img.data.data)}`}
                    alt={image.description}
                    style={imageStyle}
                  />
                </div>
                <div className="detail d-flex">
                  <div className="item-details">
                    <h5 className="mt-2">{image.name}</h5>
                    <p className="w-25">{image.description}</p>
                    <div className="d-flex justify-content-around">
                      <h5>
                        <span className="text-sm">&#8377; </span>
                        {image.price}
                      </h5>
                      <div>
                        <Link to={`/detail/${image._id}`} className="lnk">
                          <button className="btn btn-outline-success btn-sm py-0 px-1">
                            Buy now
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm my-2 mx-lg-1 py-0 px-1"
                          onClick={() => removefromCart(image._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default Cart;
