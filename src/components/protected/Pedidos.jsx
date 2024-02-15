import React, { Component } from "react";

import "../stars.scss";
//import components
import NavbarApp from "./NavbarApp.jsx";


class Pedidos extends Component {
  render() {
    return (
      <div>
      {/* <React.Fragment>*/}
        <NavbarApp />
        {/* <DashboardPedidos/> */}
        {/* <Preloader /> */}
     {/* </React.StrictMode> </React.Fragment> */}
      </div>
    );
  }
}

export default Pedidos;
