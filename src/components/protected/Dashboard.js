import React, { Component } from "react";
import logo1 from "../../assets/img/logoEscuelita.webp";
import { Redirect } from "react-router-dom";
import { logout, currentUser, sendEmailVerification } from "../../helpers/auth";
import Swal from "sweetalert2";
import "./style.css";
import $ from "jquery";
import LoadingOverlay from "react-loading-overlay";
import "firebase/analytics";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      logo: logo1,
      redirect: null,
      isLoading: false,
      isLoadingPedidos: false,
      input: {
        email: "",
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
      },
      pagos: [],
      loggedInUser: {
        email: "",
        emailVerified: false,
        uid: "",
      },
      isSubmitted: false,
      errors: {},
    };
  }

  verificarEmail() {
    Swal.fire({
      title: "Verificar Email",
      text: "Por favor, antes de seguir verifica tu email desde tu casilla, gracias.",
      icon: "warning",
      confirmButtonText: "Verificar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      reverseButtons: true,
      buttons: {
        cancel: "CANCELAR",
        verificar: {
          text: "VERIFICAR",
          value: "verificar",
        },
      },
    }).then((value) => {
      if (value.isConfirmed) {
        sendEmailVerification();
        if (!currentUser().emailVerified) {
          Swal.fire(
            "Se email no fue verificado aun. Refresque el sitio cuando este realizado"
          ).then(() => {
            logout();
            this.setState({ redirect: "/login" });
          });
        }
      } else {
        logout();
        // this.props.history.push("/login")
      }
    });
  }

  componentDidMount() {
    const loggedInUserCookie = localStorage.getItem("userEscuelitaReact");

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      let loggedInUserObject = JSON.parse(loggedInUserCookie);

      let loggedInUser = this.state.loggedInUser;
      loggedInUser.email = loggedInUserObject.email;
      loggedInUser.uid = loggedInUserObject.uid;
      loggedInUser.nombre = loggedInUserObject.nombre;
      loggedInUser.apellido = loggedInUserObject.apellido;
      loggedInUser.direccion = loggedInUserObject.direccion;
      loggedInUser.telefono = loggedInUserObject.telefono;
      loggedInUser.pagos = loggedInUserObject.pagos;

      let input = this.state.input;
      input["email"] = loggedInUser.email;
      input["nombre"] = loggedInUser.nombre ?? "";
      input["apellido"] = loggedInUser.apellido ?? "";
      input["direccion"] = loggedInUser.direccion ?? "";
      input["entreCalles"] = loggedInUser.entreCalles ?? "";
      input["telefono"] = loggedInUser.telefono ?? "";

      if (!currentUser().emailVerified) {
        this.verificarEmail();
        return;
      }

      this.setState({
        input,
        loggedInUser,
        pagos: loggedInUser.pagos,
      });
    }
  }

  handleChangeChk(event) {
    this.setState({ soloRenovar: !this.state.soloRenovar });
  }

  render() {
    const sty = {
      backgroundColor: "#25625e",
      borderColor: "transparent",
    };
    const styleObj = {
      fontFamily: "TCB_____",
    };
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text="Procesando..."
      >
        <div>
          <div className="row">
            <div className="col-sm-12">
              <div className="contact" >
                <div id="contact" style={{backgroundColor: "#e3cc77"}} className="box-shadow-full">
                  <div className="row">
                    
                    <div className="col-md-6">
                    <a style={{ fontFamily: "TCB_____"}} href={"https://docs.google.com/forms/d/e/1FAIpQLSeD8C5fnS3671vLyqyGUl0lMZW8-_eIrms9b4XqvwXBOmQrmw/viewform"} rel="noreferrer">Completar la declaración jurada de salud</a>
                      {!this.state.isSubmitted ? (
                        <form
                          onSubmit={this.handleSubmit}
                          style={{ fontFamily: "TCB_____", paddingTop: "20px" }}
                        >
                          <div className="form-group">
                            <label>Nombre</label>
                            <input
                              className="form-control"
                              name="nombre"
                              readOnly
                              value={this.state.input.nombre}
                              placeholder="Nombre"
                            />
                            <div className="text-danger">
                              {this.state.errors.nombre}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Apellido</label>
                            <input
                              className="form-control"
                              type="text"
                              readOnly
                              name="apellido"
                              value={this.state.input.apellido}
                              placeholder="Apellido"
                            />
                            <div className="text-danger">
                              {this.state.errors.apellido}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              className="form-control"
                              name="email"
                              value={this.state.input.email}
                              readOnly
                              placeholder="Email"
                            />
                            <div className="text-danger">
                              {this.state.errors.email}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Teléfono</label>
                            <input
                              className="form-control"
                              value={this.state.input.telefono}
                              name="telefono"
                              readOnly
                              placeholder="Teléfono"
                            />
                            <div className="text-danger">
                              {this.state.errors.telefono}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Domicilio</label>
                            <input
                              className="form-control"
                              placeholder="Direccion"
                              readOnly
                              value={this.state.input.direccion}
                              name="direccion"
                            />
                            <div className="text-danger">
                              {this.state.errors.direccion}
                            </div>
                          </div>
                        </form>
                      ) : (
                        <div className="col-md-6 text-center mx-auto">
                          <div>
                            <em
                              className="fa fa-check-circle-o submittedOk"
                              aria-hidden="true"
                            ></em>
                          </div>
                          <div className=" lead">Pedido Enviado</div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6" style={{ textAlign: "center" }}>
                      <LoadingOverlay
                        active={this.state.isLoadingPedidos}
                        spinner
                        text="Procesando..."
                      >
                        <div className="title-box-2 pt-4 pt-md-0">
                          <h5
                            className="title-left"
                            style={{ color: "#25625e" }}
                          >
                            Historial de Pagos
                          </h5>
                        </div>
                        {
                          <ol className="cuteUl rounded-list" style={styleObj}>
                            {this.state.pagos.map((pago) => (
                              
                              <li key={Math.random()}>
                                <div>
                                  Momento del Mes: {pago.nombre}
                                  <br />
                                  
                                  {pago.fechaPago === undefined ? '' : 'Fecha: ' + pago.fechaPago}
                                  <br />
                                  <br />
                                  Estado: {pago.estado}
                                  <br />
                                </div>
                              </li>
                            ))}
                          </ol>
                        }
                      </LoadingOverlay>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}
