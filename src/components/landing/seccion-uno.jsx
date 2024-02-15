import React from "react";
import inscripciones from "../../assets/img/inscripciones.jpeg";
import Card from "react-bootstrap/Card";
import horarios from "../../assets/img/horarios.jpeg";

class SeccionUno extends React.PureComponent {
  render() {
    return (
      <section id="seccionuno"
      style={{display:"flex"}} className="paralax-mf ">
        <Card
          style={{
            width: "25rem",
            maxWidth: "49%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Img variant="top" src={inscripciones} />
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
          <Card.Img variant="top" src={horarios} />
        </Card>
        {/* <img
          src={inscripciones}
          alt="logo navegador"
          style={{
            maxWidth: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        /> */}
      </section>
    );
  }
}

export default SeccionUno;
