import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import bannergif from '../../assets/images/banner1.json';
import footergif from '../../assets/images/footergif.json';
import mastercard from '../../assets/images/mastercard.png';
import visacard from '../../assets/images/visacard.png';
import cod from '../../assets/images/cod.png';
import back from '../../assets/images/back-button.png';
import './hero.css';
import Newcards from '../Newcards/Newcards';
import { fetchSearchResults, addToCart } from '../../redux/actions/heroActions';

const Hero = () => {
  const imageStyle = { objectFit: 'contain', height: '90px', width:"80px" };
  const cardStyle = { maxWidth: '18rem' };
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  const dispatch = useDispatch();
  const { searchResults, loading, noResultsFound } = useSelector(state => state.hero);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId))
      .then(() => {
        toast.success('Added to cart successfully');
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || error.message);
      });
  };

  return (
    <>
      <div className="hero-main p-0 m-0">
        <div className="contai shadow">
          <div className="">
            {searchQuery ? (
              <div className="search bg-white">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {noResultsFound ? (
                      <h1>No results found</h1>
                    ) : (
                      <div className="row">
                        <div className="b-button">
                          <Link to="/">
                            <img src={back} alt="" className="back-button mx-4 mx-md-5" />
                          </Link>
                          <h3 className="text-secondary">Search results</h3>
                        </div>
                        {searchResults.map((image) => (
                          <div
                            className="col-12 col-md-6 col-lg-4 d-flex col-lg-3 my-4 justify-content-center"
                            key={image._id}
                          >
                            <div
                              className="card text-cente cd"
                              style={cardStyle}
                            >
                              <div
                                className="card-img-top"
                                style={{
                                  backgroundColor: '#e8e8ed',
                                  border: '4px solid white',
                                }}
                              >
                                <img
                                  className="bg-light py-2"
                                  src={`data:${
                                    image.img.contentType
                                  };base64,${arrayBufferToBase64(
                                    image.img.data.data
                                  )}`}
                                  alt={image.name}
                                  style={imageStyle}
                                />
                              </div>
                              <div className="card-body bg-white shadow">
                                <h5 className="card-title">{image.name}</h5>
                                <p className="card-text">{image.description}</p>
                                <h5 className="card-title">
                                  <span className="text-sm">&#8377; </span>
                                  {image.price}
                                </h5>
                                <button
                                  onClick={() => handleAddToCart(image._id)}
                                  className="btn text-secondary btn-sm"
                                >
                                  Add to cart
                                </button>
                                <Link
                                  to={`/detail/${image._id}`}
                                  className="lnk"
                                >
                                  <button className="btn btn-success shadow btn-sm mx-1">
                                    Buy now
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="default bg-white">
                <div className="row p-0 m-0">
                  <div className="col col-12 p-0 m-0">
                    <Lottie animationData={bannergif} className="lottie1" />
                  </div>
                  <div className="col col-12 p-0">
                    <div className="">
                      <h1 className="p-md-2">
                        Discover Our Latest <br /> Collections
                      </h1>
                      <p>
                        Explore our latest additions and stay ahead of the curve
                        with our meticulously curated collections, designed to
                        elevate your wardrobe and keep you at the forefront of
                        fashion trends. From timeless classics that offer
                        enduring elegance to cutting-edge designs that push the
                        boundaries of contemporary style, each piece in our
                        collection is crafted with a keen eye for detail and a
                        passion for quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
          <Newcards />
          <div className="footer text-white">
            <div className="row footertop d-flex justify-content-center align-items-center">
              <div className="col-6 col-md-8 d-flex align-items-center">
                <div>
                  <p className="lead fs-6 py-3">
                    Welcome to G-market, your ultimate destination for all
                    things your niche or product type. Discover a curated
                    selection of high-quality products sourced from around the
                    globe. Experience excellence with every purchase at G-market
                  </p>
                </div>
              </div>
              <div className="col-6 col-md-4 d-flex justify-content-center align-items-center p-0">
                <div>
                  <Lottie animationData={footergif} className="lottie2" />
                </div>
              </div>
            </div>
            <hr />
            <div className="row payment d-flex justify-content-center align-items-center">
              <h6 className="lead">Payment methods</h6>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <div>
                  <img src={visacard} alt="" />
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <div>
                  <img src={cod} alt="" />
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <div>
                  <img src={mastercard} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default Hero;
