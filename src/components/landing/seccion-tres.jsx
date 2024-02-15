import React from "react";
import Card from "react-bootstrap/Card";
import precios from "../../assets/img/precios.jpeg";
import contacto from "../../assets/img/contacto.jpeg";

class SeccionTres extends React.Component {
  render() {
    return (
      <section
        id="secciontres"
        style={{ display: "flex" }}
        className="paralax-mf footer-paralax route"
      >
        <Card
          style={{
            width: "25rem",
            maxWidth: "49%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Img variant="top" src={precios} />
        </Card>
        <Card
          style={{
            width: "25rem",
            maxWidth: "49%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Img variant="top" src={contacto} />
        </Card>
      </section>
    );
  }
}

export default SeccionTres;
