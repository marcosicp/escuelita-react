import React, { Component } from "react";

import "../stars.scss";
import Contact from "./seccion-tres.jsx";
import BackToTop from "./back-top.jsx";
import Preloader from "./preloader";
import Swal from "sweetalert2";

import Navbar from "./navbar";
import SeccionCuatro from "./seccion-cuatro";
import SeccionTres from "./seccion-tres";
import SeccionDos from "./seccion-dos";
import SeccionUno from "./seccion-uno";

class Landing extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar />
        <SeccionUno />
        <SeccionTres />
        <SeccionCuatro />
        <SeccionDos />
        <BackToTop />
        <Preloader />
      </div>
    );
  }
}

export default Landing;
