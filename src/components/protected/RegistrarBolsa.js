import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";
import {
  getAlumnoByUID,
} from "../../helpers/firebase";

class RegistrarBolsa extends Component {
  constructor(props) {
    super(props);
    this.loggedUser = {};
    this.state = {
      bolsas: [],
      codigoURL: "",
      isLoading: false,
      isLoadingBolsas: false,
      codigo: "",
      isSubmitted: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    match = regex.exec(window.location.href);
    console.log(match);
    // Cuando el componente ya esta listo
    const loggedInUserCookie = localStorage.getItem("userEscuelitaReact");

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      let loggedInUserObject = JSON.parse(loggedInUserCookie);
      if (loggedInUserObject !== null) {
        this.loggedUser = loggedInUserObject;
      }
    }

    if (match !== null) {
      if (match[1] === "codigo") {
        if (match[2] !== "" && match[2] !== null) {
          this.setState({ codigo: match[2] });
        }
      }
    }

    getBolsasByUID(this.loggedUser.uid).then((bolsas) => {
      this.setState({ isLoadingBolsas: true });
      let obj = bolsas.docs.map((doc) => {
        let obj2 = doc.data();
        obj2.creado = new Date(obj2.creado.seconds * 1000);
        return obj2;
      });

      obj.sort((a, b) => b.creado.getTime() - a.creado.getTime());

      this.setState({
        bolsas: obj,
        isLoadingBolsas: false,
      });
    });
  }

  handleChange(event) {
    this.setState({
      codigo: event.target.value,
    });
  }

  render() {
    const styleObj = {
      counterReset:
        "my-custom-counter " + (this.state.bolsas.length + 1).toString(),
      fontFamily: "TCB_____",
    };
    const sty = {
      backgroundColor: "#25625e",
      borderColor: "transparent",
    };

    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text="Procesando..."
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="contact" style={{ fontFamily: "TCB_____" }}>
              <div id="contact" className="box-shadow-full">
                <h2
                  style={{
                    color: "#378f87",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  Asigna tu bolsa mágica
                </h2>
                <div className="row">
                  <div className="col-md-6">
                    {
                      // this.state.codigoURL ? (

                      // ) : (
                      //   <div className="col-md-6 text-center mx-auto">
                      //     <div>
                      //       <em
                      //         className="fa fa-check-circle-o submittedOk"
                      //         aria-hidden="true"
                      //       ></em>
                      //     </div>
                      //     <div className=" lead">
                      //       Bolsa registrada correctamente
                      //     </div>
                      //   </div>
                      // )
                      !this.state.isSubmitted ? (
                        <form
                          onSubmit={this.handleSubmit}
                          style={{ fontFamily: "TCB_____" }}
                        >
                          <div className="form-group">
                            <label>Ingresa el codigo de tu bolsa</label>
                            <input
                              className="form-control"
                              onChange={this.handleChange}
                              name="codigo"
                              value={this.state.codigo}
                              placeholder="Ej: ABC123"
                            />
                            <div className="text-danger">
                              {this.state.errors.codigo}
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={sty}
                          >
                            ASIGNAR
                          </button>
                        </form>
                      ) : (
                        <div className="col-md-6 text-center mx-auto">
                          <div>
                            <em
                              className="fa fa-check-circle-o submittedOk"
                              aria-hidden="true"
                            ></em>
                          </div>
                          <div className=" lead">
                            Bolsa asignada correctamente
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="col-md-6" style={{ textAlign: "center" }}>
                    <LoadingOverlay
                      active={this.state.isLoadingBolsas}
                      spinner
                      text="Procesando..."
                    >
                      <div className="more-info">
                        <h4 className="font-seria">
                          Historial de Bolsas Asignadas
                          <br />
                        </h4>
                      </div>
                      {this.state.bolsas.length >= 1 ? (
                        <ol className="cuteUl rounded-list" style={styleObj}>
                          {this.state.bolsas.map((bolsa) => (
                            <li key={bolsa.creado}>
                              <div>
                                Fecha Asignación:
                                {bolsa.creado.toLocaleDateString()}
                                <br />
                                Código: {bolsa.codigo}
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div>
                          <h4 className="font-seria">
                            ¡Asigna tu primer bolsa!
                            <br />
                          </h4>
                        </div>
                      )}
                    </LoadingOverlay>
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

export default RegistrarBolsa;
