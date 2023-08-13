import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
function ThisMonthComponent({ getOrders }) {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch(
        (er) => dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, []);

  // Fungsi untuk mengelompokkan data berdasarkan bulan dan menghitung total cartSubtotal per bulan
  const groupOrdersByMonth = (orders) => {
    return orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!acc[monthYear]) {
        acc[monthYear] = {
          monthYear,
          totalSubtotal: order.orderTotal.cartSubtotal,
        };
      } else {
        acc[monthYear].totalSubtotal += order.orderTotal.cartSubtotal;
      }
      return acc;
    }, {});
  };
  const ordersByMonth = Object.values(groupOrdersByMonth(orders));

  return (
    <Row className="m-5">
      <Col md={2}></Col>
      <Col md={10}>
        <h1>Monthly Income</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ordersByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSubtotal" fill="#82ca9d" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
}

export default ThisMonthComponent;
