import React from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";

import ImageZoom from "js-image-zoom";
import { useEffect } from "react";

function ProductDetailsScreen() {
    var options = {
      // width: 400,
      // zoomWidth: 500,
      // fillContainer: true,
      // zoomPosition: "bottom",
      scale: 2,
      offset: { vertical: 0, horizontal: 0 },
    };
    useEffect(() => {
      new ImageZoom(document.getElementById("first"), options);
      new ImageZoom(document.getElementById("second"), options);
      new ImageZoom(document.getElementById("third"), options);
      new ImageZoom(document.getElementById("fourth"), options);
    });
  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
        <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image
              crossOrigin="anonymous"
              fluid
              src="/images/games-category.png"
            />
          </div>
          <br />
          <div id="second">
            <Image fluid src="/images/monitors-category.png" />
          </div>
          <br />
          <div id="third">
            <Image fluid src="/images/tablets-category.png" />
          </div>
          <br />
          <div id="fourth">
            <Image fluid src="/images/games-category.png" />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product Name</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">Rp.500</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Porta ac consectetur ac Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Perferendis, illo.
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">Rp.500</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>500</option>
                    <option value="1">600</option>
                    <option value="2">700</option>
                    <option value="3">800</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger">Danger</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    John Doe <br />
                    <br />
                    20-09-2001 <br />
                    Porta ac consectetur ac Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Perferendis, illo.
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary">Primary</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsScreen;