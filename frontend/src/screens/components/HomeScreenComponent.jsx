import React, { useEffect, useState } from "react";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";

function HomeScreenComponent({ categories }) {
  //   const categories = [
  //     "Undangan",
  //     "MMT/Spanduk",
  //     "Bungkus Makanan",
  //     "Serat Ulem",
  //   ];
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);
  return (
    <>
      <ProductCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeScreenComponent;
