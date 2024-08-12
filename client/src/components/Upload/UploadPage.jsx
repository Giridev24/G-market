import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./upload.css";
import { baseUrl } from "../Urls";
import back from "../../assets/images/back-button.png";

const UploadPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null); // Stores the id of the image being edited
  const [editValues, setEditValues] = useState({
    name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token, navigate to login");
      navigate("/login");
      return;
    }
    console.log("Token available");

    (async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/upload`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const { data } = response;
        if (data.success && Array.isArray(data.images)) {
          setImages(data.images);
        } else {
          console.log("No data from backend");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images.");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);
const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("testImage", file);
  
    try {
      const res = await axios.post(`${baseUrl}/api/upload`, formData, {
        withCredentials: true,
      });
  
      if (res.data.msg) {
        toast.success(res.data.msg); 
      } else {
        toast.error("Unexpected response from server.");
      }
  
     
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg); 
      } else {
        toast.error("Error uploading image.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/upload/${id}`, {
        withCredentials: true,
      });
      toast.success("Item deleted successfully");
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item.");
    }
  };

  const handleEdit = (image) => {
    setEditMode(image._id);
    setEditValues({
      name: image.name,
      description: image.description,
      price: image.price,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${baseUrl}/api/upload/${id}`, editValues, {
        withCredentials: true,
      });
      toast.success("Changes saved successfully!");
      setImages((prevImages) =>
        prevImages.map((image) =>
          image._id === id ? { ...image, ...editValues } : image
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Error saving changes.");
    }
  };

  const cardStyle = { width: "100%", height: "100%", boxShadow: "none" };
  const imageStyle = { objectFit: "contain", height: "60%", width: "60%" };

  return (
    <div className="upload-main">
      <div className="upload-child shadow"> 
        <h1 className="admin-dash">ADMIN DASHBOARD</h1>
        <div className="upagelft">
          <div className="prdctform">
            <h2 className="text-center fw-regular m-4 text-secondary">
              Product Upload
            </h2>
            <div className="l text-center">
              <label>Name:</label>
              <input
                className="p-1 n"
                type="text"
                placeholder="Product name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="l text-center">
              <label>Description:</label>
              <input
                className="p-1 n d"
                type="text"
                placeholder="Product description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="l text-center">
              <label>Price:</label>
              <input
                className="p-1 n p"
                type="text"
                placeholder="Product price"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <div className="d-flex l text-center">
              <label className="imagel mt-2">Image:</label>
              <input className="cf" type="file" onChange={handleFileChange} />
            </div>
            <div className="d-flex">
              <button
                className="ub btn btn-success btn-sm shadow font-weight-normal"
                onClick={handleUpload}
              >
                Upload
              </button>
              <Link className="ob border border-primary shadow" to="/orders">
                <h3 className="text-primary mx-0 mx-md-4 fw-bold">Orders</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="upagergt">
          <div>
            {loading ? (
              <h5 className="text-center text-warning load">Loading...</h5>
            ) : (
              <div className="row">
                {images.length > 0 ? (
                  images.map((image) => (
                    <div key={image._id} className="col-12 my-1">
                      <div className="card ud" style={cardStyle}>
                        <div className="row no-gutters">
                          <div className="col-3">
                            <img
                              className="card-img bg-light"
                              src={`data:${
                                image.img.contentType
                              };base64,${arrayBufferToBase64(
                                image.img.data.data
                              )}`}
                              alt={image.name}
                              style={imageStyle}
                            />
                          </div>
                          <div className="col-6 my-2">
                            <div className="detail-body">
                              {editMode === image._id ? (
                                <>
                                  <input
                                    type="text"
                                    name="name"
                                    value={editValues.name}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                  />
                                  <input
                                    type="text"
                                    name="description"
                                    value={editValues.description}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                  />
                                  <input
                                    type="text"
                                    name="price"
                                    value={editValues.price}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                  />
                                  <button
                                    onClick={() => handleSave(image._id)}
                                    className="btn btn-outline-success btn-sm shadow font-weight-normal"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditMode(null)}
                                    className="btn btn-outline-danger ms-1 btn-sm shadow font-weight-normal ml-2"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <h6 className="card-title">{image.name}</h6>
                                  <p className="card-text small">
                                    {image.description}
                                  </p>
                                  <h6 className="card-title">
                                    <span className="text-sm">&#8377; </span>
                                    {image.price}
                                  </h6>
                                  <button
                                    onClick={() => handleEdit(image)}
                                    className="btn btn-success p-1 btn-sm p1 shadow font-weight-normal"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(image._id)}
                                    className="btn btn-danger p-1 ms-1 btn-sm p1 shadow font-weight-normal"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </div>
            )}
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

export default UploadPage;
