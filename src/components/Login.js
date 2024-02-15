import React, { Component } from "react";
import { login, resetPassword } from "../helpers/auth";
import "../components/stars.scss";
import { Link } from "react-router-dom";
import logo1 from "../assets/img/logoEscuelita.webp";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import "firebase/analytics";
import { getAlumnoByEmail } from "../helpers/firebase";

function setErrorMsg(error) {
  return {
    loginMessage: error,
  };
}

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      logo: logo1,
      isLoading: false,
      loginMessage: null,
      isOlvideContra: false,
      errors: {},
      isAuth: false,
      input: {
        email: "",
        password: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Cuando el componente ya esta listo
    const loggedInUserCookie = localStorage.getItem("userEscuelitaReact");

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      let loggedInUserObject = JSON.parse(loggedInUserCookie);
      if (loggedInUserObject !== null) {
        this.props.history.push("/bienvenido/dashboard");
      }
    }
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
    this.setState({ isLoading: true });
    e.preventDefault();
    if (this.validForm()) {
      var usuario = {};

      login(this.state.input.email, this.state.input.password)
        .then((response) => {
          usuario = {
            uid: response.user.uid,
            emailVerified: response.user.emailVerified,
            email: response.user.email,
          };
        })
        .finally(() => {
          getAlumnoByEmail(usuario.email)
            .then((alumnoDB) => {
              const alumno = alumnoDB.docs[0].data();
              usuario.nombre = alumno.nombre;
              usuario.apellido = alumno.apellido;
              usuario.direccion = alumno.direccion;
              usuario.telefono = alumno.telefono;
              usuario.pagos = alumno.pagos;

              localStorage.setItem(
                "userEscuelitaReact",
                JSON.stringify(usuario)
              );
              this.setState({ isLoading: false, isAuth: true });

              this.props.history.push("/bienvenido/dashboard");
            })
            .catch((error) => {
              this.setState({ isLoading: false });
            });
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
              "Access to this account has been temporarily disabled"
            )
          ) {
            swal({
              title: "Error al ingresar",
              text: "Verifique su usuario",
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
              text: "Verifique su usuario",
              icon: "error",
              button: "ACEPTAR",
            });
          }
        });
    } else {
      this.setState({ isLoading: false });
    }
  };

  resetearState = () => {
    this.setState({
      isOlvideContra: !this.state.isOlvideContra,
    });
  };

  resetPassword = () => {
    resetPassword(this.state.input.email)
      .then(() => {
        swal({
          title: "Envio de email",
          text: "Revise su casilla. Le enviamos un email para recuperar su contraseña",
          icon: "warning",
          button: "ACEPTAR",
        });

        this.setState({ isOlvideContra: !this.state.isOlvideContra });
      })
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)));
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
            <div className="card1">
              <div className="row justify-content-center">
                <div className="col-md-8 col-10">
                  <a href="/">
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
                      <img id="logo-login" alt="Imagen Login" src={logo1} />{" "}
                    </Link>
                  </div>
                  {!this.state.isOlvideContra ? (
                    <form
                      onSubmit={this.handleSubmit}
                      style={{ fontFamily: "TCB_____" }}
                    >
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Email
                        </label>
                        <input
                          className="form-control"
                          // ref={(email) => (this.state.input.email = email)}
                          onChange={this.handleChange}
                          name="email"
                          placeholder="Email"
                        />
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      </div>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={this.handleChange}
                          placeholder="Password"
                          // ref={(pw) => (this.state.input.password = pw)}
                        />
                        <div className="text-danger">
                          {this.state.errors.password}
                        </div>
                      </div>
                      <div className="row justify-content-center px-3">
                        {" "}
                        <button type="submit" className="btn-block btn-color">
                          INGRESAR
                        </button>{" "}
                        {/* <button
                            type="button"
                            onClick={this.signInGoogle}
                            className="btn-block btn-color"
                          >
                            GOOGLE
                          </button>{" "} */}
                      </div>
                      <div className="row justify-content-center">
                        {" "}
                        <a href="#">
                          <small
                            onClick={this.resetearState}
                            className="text-muted"
                          >
                            Olvide mi contraseña?
                          </small>
                        </a>{" "}
                      </div>
                    </form>
                  ) : (
                    <form
                      onSubmit={this.resetPassword}
                      style={{ fontFamily: "TCB_____" }}
                    >
                      <h3 className="text-center heading">
                        Restablecer contraseña
                      </h3>
                      <div className="form-group">
                        {" "}
                        <label className="form-control-label text-muted">
                          Email
                        </label>
                        <input
                          className="form-control"
                          onChange={this.handleChange}
                          name="email"
                          placeholder="Email"
                        />
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      </div>
                      <div className="row justify-content-center px-3">
                        {" "}
                        <button type="submit" className="btn-block btn-color">
                          ENVIAR
                        </button>{" "}
                      </div>
                      <div className="row justify-content-center">
                        {" "}
                        <a href="#">
                          <small
                            onClick={this.resetearState}
                            className="text-muted"
                          >
                            Volver
                          </small>
                        </a>{" "}
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div
                className="text-center mb-4"
                style={{ fontFamily: "TCB_____" }}
              >
                {/* <p href="#" className="sm-text mx-auto mb-2">
                  No tengo cuenta?
                  <Link to="/registro" className="btn btn-white ml-2">
                    Crear cuenta
                  </Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}
