import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./orders.css"
import { baseUrl } from "../Urls";
import back from "../../assets/images/back-button.png";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/orders`);
        console.log(response.data)
        setOrders(response.data); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchData();
  }, []);



  return (
    <div className="orders-main">
      <div className="table-cont shadow" >
        <div className="table-responsive">
        <img
        src={back}
        alt=""
        onClick={() => navigate(-1)}
        className="back-button mb-auto d-none d-md-block mt-3"
      />
          <table className="table table-striped shadow ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client name</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Product ordered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} >
                  <th scope="row">{index + 1}</th>
                  <td>{order.uname}</td>
                  <td>{order.address}</td>
                  <td>{order.contact}</td>
                  <td>{order.name}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
