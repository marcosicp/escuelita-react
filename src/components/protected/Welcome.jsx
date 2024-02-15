import React, { Component } from "react";
import { Route, Switch } from "react-router";
import $ from "jquery";
import "../stars.scss";
import Dashboard from "./Dashboard";
//import components
import Navbar from "./NavbarApp.jsx";
import RegistrarBolsa from "./RegistrarBolsa";
// import Tienda from "../shop/tienda";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      registrarBolsa: false,
    };
  }

  componentDidMount(){
    $(".navbar-b").css(
      "background-image",
      "linear-gradient(transparent, transparent)"
    );
  }

  // registrarBolsa = (e) => {
  //   
  //   this.setState({ registrarBolsa: e });
  // };

  render() {
    return (
      <div>
        <Navbar />
          <Switch>
            <Route
              path="/bienvenido/"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/dashboard`} component={Dashboard} />
                  <Route path={`${url}/asignarBolsa`} component={RegistrarBolsa} />
                  {/* <Route path={`${url}/tienda`} component={Tienda} /> */}
                </>
              )}
          />
          </Switch>
      </div>
    );
  }
}

export default Welcome;
