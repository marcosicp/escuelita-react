import React, { Component } from "react";
import "../components/stars.scss";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Landing from "./landing/landing";
import { firebaseAuth } from "../config/constants";
import Welcome from "./protected/Welcome";
import Pedidos from "./protected/Pedidos";
import { logout } from "../helpers/auth";
// import Tienda from "../components/shop/tienda";
// import RegistrarBolsa from "./protected/RegistrarBolsa";
// import Dashboard from "./protected/Dashboard";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    email: "",
  };

  componentDidMount() {
    this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          email: user.email,
        });
      } else {
        logout();
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return this.state.loading === true ? (
      <h1 style={{ color: "#25625e" }} className="text-center">
        Cargando...
      </h1>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/registro" component={Register} />
          {/* <Route path="/tienda" component={Tienda} /> */}
          <PrivateRoute
            authed={this.state.authed}
            path="/bienvenido/dashboard"
            component={Welcome}
          />

          <PrivateRoute
            authed={this.state.authed}
            path="/bienvenido/asignarBolsa"
            component={Welcome}
          />


          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
