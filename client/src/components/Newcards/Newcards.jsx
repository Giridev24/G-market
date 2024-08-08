import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import styled from "styled-components";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"; 
import "./newcard.css";
import { baseUrl } from "../Urls";
import favorites from "../../assets/images/favorite.png"

const Box = styled.div`
  background-color: tomato !important; 
`;

const Newcards = () => {
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          left: "43%",
          top:"103%",
          zIndex: 1,
          borderRadius: "15px",
          boxShadow: "rgba(150, 100, 111, 0.5) 0px 7px 29px 0px",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          right: "43%",
          top:"103%",
          zIndex: 1,
          borderRadius: "15px",
          boxShadow: "rgba(150, 100, 111, 0.5) 0px 7px 29px 0px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 4000,
        },
      },
    ],
  };
  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/cards`);
        setProducts(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const imageStyle = { objectFit: "contain", height: "100px" };

  const addToCart = (productId) => {
    const itemId = productId;

    axios
      .post(`${baseUrl}/api/card/${productId}`, { itemId })
      .then((response) => {
        console.log("Product added to cart successfully");
        toast.success("Added to cart successfully");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error === "Product already in cart"
        ) {
        
          toast.warn("Product is already in your cart");
        } else {
          // Handle other errors
          console.error(
            "Error adding product to cart:",
            error.response?.data?.error || error.message
          );
          toast.error("Failed to add product to cart");
        }
      });
  };
  const addToFavorites = (productId) => {
    const itemId = productId;

    axios
      .post(`${baseUrl}/api/favorites/${productId}`, { itemId })
      .then((response) => {
        console.log("Product added to favorites successfully");
        toast.success(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error === "Product already in favorites"
        ) {
         
          toast.warn("Product is already in your favorites");
        } else {
       
          console.error(
            "Error adding product to favorite:",
            error.response?.data?.error || error.message
          );
          toast.error("Failed to add product to favorite");
        }
      });
  };

  const renderSlides = () => {
    if (loading) {
      return (
        <h2 className="text-center text-warning load">Loads in 50 secs...</h2>
      );
    } else {
      return products.map((product) => (
        <div key={product._id} className=" d-flex justify-content-center">
          <div className="card text-center border-0 cd">
            <div className="card-img-top" style={{
                                  backgroundColor: "#e8e8ed",
                                  border: "4px solid white",
                                }}>
              <img
                className=" bg-light py-2"
                src={`data:${
                  product.img.contentType
                };base64,${arrayBufferToBase64(product.img.data.data)}`}
                alt={product.name}
                style={imageStyle}
              /> 
            </div>
            <div className="card-body bg-white">
            <img src={favorites} onClick={() => addToFavorites(product._id)}  className="favorites" alt="" />
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <h5 className="card-title">
                <span className="text-sm">&#8377; </span>
                {product.price}
              </h5> 

              <button
                onClick={() => addToCart(product._id)}
                className="btn text-secondary btn-sm"
              >
                Add to cart
              </button>
              <Link to={`/detail/${product._id}`} className="lnk">
                <button className="btn btn-success shadow btn-sm mx-1">
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className="App cardbody py-4 ">
        <h4 className="my-5 text-center text-secondary">Elevate Your Style</h4>

        <Slider {...settings}>{renderSlides()}</Slider>

        <h6 className="text-center mt-4 my-md-5 p-4 py-md-0 text-secondary lead">
          Experience luxury with our premium product, designed for those who
          appreciate the finer things in life. Crafted with exquisite detail and
          superior materials, each card embodies elegance and sophistication.
          Whether you're presenting a gift or treating yourself, our premium
          product card ensures a memorable experience every time. Discover the
          epitome of quality and style with our exclusive range of products.
        </h6>
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

export default Newcards;
