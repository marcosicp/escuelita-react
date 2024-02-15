import React, { Component } from "react";
import { auth, logout } from "../helpers/auth";
import { registerCycleador } from "../helpers/firebase";
import logo1 from "../assets/img/logoEscuelita.webp";
import logo2 from "../assets/img/logoEscuelita.webp";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import "firebase/analytics";
import firebase from "firebase/app";
import LoadingOverlay from "react-loading-overlay";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      logo: logo1,
      loginMessage: null,
      errors: {},
      input: {
        email: "",
        nomlbre: "",
        apellido: "",
        password: "",
        passwordrepeat: "",
        telefono: "",
        direccion: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  validForm() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Por favor verifique su contraseña.";
    }

    if (input["password"] !== input["passwordrepeat"]) {
      isValid = false;
      errors["password"] = "Las contraseñas deben coincidir.";
    }

    // if (!input["nombre"]) {
    //   isValid = false;
    //   errors["nombre"] = "Por favor ingrese su nombre.";
    // }

    // if (!input["apellido"]) {
    //   isValid = false;
    //   errors["apellido"] = "Por favor ingrese su apellido.";
    // }
    if (!input["telefono"]) {
      isValid = false;
      errors["telefono"] = "Por favor ingrese su teléfono.";
    }

    if (!input["direccion"]) {
      isValid = false;
      errors["direccion"] = "Por favor ingrese su dirección.";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Por favor ingrese su email.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Por favor ingrese un email válido.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    if (this.validForm()) {
      auth(this.state.input.email, this.state.input.password)
        .then((response) => {
          
          response.user.sendEmailVerification();
          
            swal({
              title: "Usuario Registrado",
              text: "Por favor verificá este email desde tu casilla y accede a Claret.",
              icon: "success",
              button: "INGRESAR",
            }).then((value) => {
              this.props.history.push("/login");
            });

            logout();
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          if (error.message.includes("The password is invalid")) {
            swal({
              title: "Error al ingresar",
              text: "Verifique su contraseña",
              icon: "warning",
              button: "ACEPTAR",
            });
          }

          if (
            error.message.includes(
              "The email address is already in use by another account."
            )
          ) {
            swal({
              title: "Usuario no disponible",
              text: "Email en uso, pruebe con otro por favor.",
              icon: "warning",
              button: "ACEPTAR",
            });
          }

          if (
            error.message.includes(
              "Access to this account has been temporarily disabled"
            )
          ) {
            swal({
              title: "Error al ingresar",
              text: "Cuenta temporalmente deshabilitada",
              icon: "error",
              button: "ACEPTAR",
            });
          }

          if (
            error.message.includes(
              "There is no user record corresponding to this identifier"
            )
          ) {
            swal({
              title: "Error al ingresar",
              text: "Usuario no disponible",
              icon: "error",
              button: "ACEPTAR",
            });
          }
        });
    }
  };
  
  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text="Ingresando..."
      >
        <div className="">
          <div className="card card0">
            <div className="d-flex flex-md-row flex-column-reverse">
              <div className="card card1">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-10">
                    <a href="/login">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-arrow-left-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                        />
                      </svg>
                    </a>
                    <div className="row justify-content-center px-3 mb-3 mt-3">
                      <Link to="/">
                        <img
                          id="logo-login"
                          alt="Imagen Registrar"
                          src={logo2}
                        />{" "}
                      </Link>
                    </div>
                    <form
                      onSubmit={this.handleSubmit}
                      style={{ fontFamily: "TCB_____" }}
                    >
                      <h3 className="text-center heading">
                        Registro Nuevo Reciclador
                      </h3>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Username
                        </label>
                        <input
                          type="text"
                          id="email"
                          onChange={this.handleChange}
                          name="email"
                          placeholder="Ingrese su email"
                          className="form-control"
                        />
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      </div>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          id="telefono"
                          onChange={this.handleChange}
                          name="telefono"
                          placeholder="Ingrese su telefono"
                          className="form-control"
                        />
                        <div className="text-danger">
                          {this.state.errors.telefono}
                        </div>
                      </div>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Dirección
                        </label>
                        <input
                          type="direccion"
                          id="direccion"
                          onChange={this.handleChange}
                          name="direccion"
                          placeholder="Ingrese su dirección"
                          className="form-control"
                        />
                        <div className="text-danger">
                          {this.state.errors.direccion}
                        </div>
                      </div>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          onChange={this.handleChange}
                          name="password"
                          placeholder="Contraseña"
                          className="form-control"
                        />
                        <div className="text-danger">
                          {this.state.errors.password}
                        </div>
                      </div>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Repetir Contraseña
                        </label>
                        <input
                          type="password"
                          id="passwordrepeat"
                          name="passwordrepeat"
                          onChange={this.handleChange}
                          placeholder="Repetir Contraseña"
                          className="form-control"
                        />
                        <div className="text-danger">
                          {this.state.errors.passwordrepeat}
                        </div>
                      </div>
                      <div className="row justify-content-center px-3">
                        {" "}
                        <button className="btn-block btn-color">
                          REGISTRARME
                        </button>{" "}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card card2">
                <div className="my-auto mx-md-5 px-md-5 right">
                  <h3 className="text-white">Claret</h3>{" "}
                  <small
                    className="text-white"
                    style={{ fontFamily: "TCB_____" }}
                  >
                    ¡Sumate a reciclar responsablemente con Claret!
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}
