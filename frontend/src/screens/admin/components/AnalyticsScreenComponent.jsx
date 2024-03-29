import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";

function AnalyticsScreenComponent({
  fetchOrdersForFirstDate,
  fetchOrdersForSecondDate,
  socketIOClient,
}) {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  var previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    let today = new Date().toDateString();
    const handler = (newOrder) => {
      var orderDate = new Date(newOrder.createdAt).toLocaleString("en-US", {
        // hour: "numeric",
        // hour12: true,
        // timeZone: "UTC",
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      if (new Date(newOrder.createdAt).toDateString() === today) {
        if (today === new Date(firstDateToCompare).toDateString()) {
          setDataForFirstSet((prev) => {
            if (prev.length === 0) {
              return [
                {
                  name: orderDate,
                  [firstDateToCompare]: newOrder.orderTotal.cartSubtotal,
                },
              ];
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][firstDateToCompare] +=
                newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElem = {
                name: orderDate,
                [firstDateToCompare]:
                  prev[length - 1][firstDateToCompare] +
                  newOrder.orderTotal.cartSubtotal,
              };
              return [...prev, lastElem];
            }
          });
        } else if (today === new Date(secondDateToCompare).toDateString()) {
          setDataForSecondSet((prev) => {
            if (prev.length === 0) {
              return [
                {
                  name: orderDate,
                  [secondDateToCompare]: newOrder.orderTotal.cartSubtotal,
                },
              ];
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][secondDateToCompare] +=
                newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElem = {
                name: orderDate,
                [secondDateToCompare]:
                  prev[length - 1][secondDateToCompare] +
                  newOrder.orderTotal.cartSubtotal,
              };
              return [...prev, lastElem];
            }
          });
        }
      }
    };
    socket.on("newOrder", handler);
    // socket.on("newOrder",(data) => console.log(data));
    return () => socket.off("newOrder", handler);
  }, [
    setDataForFirstSet,
    setDataForSecondSet,
    firstDateToCompare,
    secondDateToCompare,
  ]);

  useEffect(() => {
    // const abctrl = new AbortController();
    fetchOrdersForFirstDate(firstDateToCompare)
      .then((data) => {
        //   console.log(data))
        // meenyimpan semua cartsubtotal/price
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
          return { name: date, [firstDateToCompare]: orderSum };
        });
        // console.log(orders);
        setDataForFirstSet(orders);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );

    fetchOrdersForSecondDate(secondDateToCompare)
      .then((data) =>
        //   console.log(data))
        {
          let orderSum = 0;
          const orders = data.map((order) => {
            orderSum += order.orderTotal.cartSubtotal;
            var date = new Date(order.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
              timeZone: "UTC",
            });
            return { name: date, [secondDateToCompare]: orderSum };
          });
          //   console.log(orders);
          setDataForSecondSet(orders);
        }
      )
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    // return () => abctrl.abort();
  }, [firstDateToCompare, secondDateToCompare]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };

  //   const data = [
  //     {
  //       name: "12:00 AM",
  //       "2022 year": 4000,
  //       "2021 year": 4100,
  //     },
  //     {
  //       name: "1:00 AM",
  //       "2022 year": 4200,
  //       "2021 year": 4300,
  //     },
  //     {
  //       name: "2:00 AM",
  //       "2022 year": 4400,
  //       "2021 year": 4500,
  //     },
  //     {
  //       name: "3:00 AM",
  //       "2022 year": 4600,
  //       "2021 year": 4600,
  //     },
  //     {
  //       name: "4:00 AM",
  //       "2022 year": 4800,
  //       "2021 year": 5000,
  //     },
  //     {
  //       name: "5:00 AM",
  //       "2022 year": 5000,
  //       "2021 year": 5200,
  //     },
  //     {
  //       name: "6:00 AM",
  //       "2022 year": 5200,
  //       "2021 year": 5400,
  //     },
  //     {
  //       name: "7:00 AM",
  //       "2022 year": 5600,
  //       "2021 year": 6000,
  //     },
  //     {
  //       name: "8:00 AM",
  //       "2022 year": 6000,
  //       "2021 year": 6300,
  //     },
  //     {
  //       name: "9:00 AM",
  //       "2022 year": 6400,
  //       "2021 year": 7000,
  //     },
  //     {
  //       name: "10:00 AM",
  //       "2022 year": 6800,
  //       "2021 year": 7200,
  //     },
  //     {
  //       name: "11:00 AM",
  //       "2022 year": 7000,
  //       "2021 year": 7800,
  //     },
  //     {
  //       name: "12:00 PM",
  //       "2022 year": 7200,
  //       "2021 year": 8200,
  //     },
  //     {
  //       name: "1:00 PM",
  //       "2022 year": 7500,
  //       "2021 year": 8400,
  //     },
  //     {
  //       name: "2:00 PM",
  //       "2022 year": 7700,
  //       "2021 year": 9000,
  //     },
  //     {
  //       name: "3:00 PM",
  //       "2022 year": 8000,
  //       "2021 year": 9500,
  //     },
  //     {
  //       name: "4:00 PM",
  //       "2022 year": 8400,
  //       "2021 year": 10000,
  //     },
  //     {
  //       name: "5:00 PM",
  //       "2022 year": 9000,
  //       "2021 year": 12000,
  //     },
  //     {
  //       name: "6:00 PM",
  //       "2022 year": 10500,
  //       "2021 year": 17000,
  //     },
  //     {
  //       name: "7:00 PM",
  //       "2022 year": 16000,
  //       "2021 year": 20000,
  //     },
  //     {
  //       name: "8:00 PM",
  //       "2022 year": 17000,
  //       "2021 year": 21000,
  //     },
  //     {
  //       name: "9:00 PM",
  //       "2022 year": 17400,
  //       "2021 year": 22000,
  //     },
  //     {
  //       name: "10:00 PM",
  //       "2021 year": 23000,
  //     },
  //     {
  //       name: "11:00 PM",
  //       "2021 year": 23500,
  //     },
  //   ];
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Cumulative Revenue</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            onChange={firstDateHandler}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
            defaultValue={firstDateToCompare}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={secondDateHandler}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
            defaultValue={secondDateToCompare}
          />
        </Form.Group>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicatedCategory={false}
            />
            <YAxis
              label={{ value: "REVENUE ", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {dataForFirstSet.length > dataForSecondSet.length ? (
              <>
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            ) : (
              <>
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            )}
            {/* <Line
              type="monotone"
              dataKey="2021 year"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="2022 year"
              stroke="#82ca9d"
              strokeWidth={4}
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
}

export default AnalyticsScreenComponent;
