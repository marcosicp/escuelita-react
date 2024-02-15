import React from "react";
import $ from "jquery";
import logo2 from "../../assets/img/logoEscuelita.webp";
import { logout } from "../../helpers/auth";
import logo1 from "../../assets/img/logoEscuelita.webp";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

class NavbarApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      logo: logo2,
      email: "",
      imageURL: "",
      nombre: "",
    };

    this.registrarBolsa = this.registrarBolsa.bind(this);
    this.imageEle = React.createRef();
  }

  stopCam = () => {
    const stream = this.videoEle.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  };

  startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      this.videoEle.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };

  registrarBolsa() {
    this.props.registrarBolsa(true);
  }

  componentDidMount() {
    const nav = $("nav");
    let navHeight = nav.outerHeight();

    $(".navbar-toggler").on("click", function () {
      if (!$("#mainNav").hasClass("navbar-reduce")) {
        $("#mainNav").addClass("navbar-reduce");
      }
    });

    $("body").scrollspy({
      target: "#mainNav",
      offset: navHeight,
    });

    $(".js-scroll").on("click", function () {
      $(".navbar-collapse").collapse("hide");
    });

    window.addEventListener("scroll", this.someFunction);

    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
      if (
        window.location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        window.location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - navHeight + 5,
            },
            1000,
            "easeInExpo"
          );
          return false;
        }
      }
    });

    $(".js-scroll").on("click", function () {
      $(".navbar-collapse").collapse("hide");
    });

    const loggedInUserCookie = localStorage.getItem("userEscuelitaReact");

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      let loggedInUserObject = JSON.parse(loggedInUserCookie);

      let email = loggedInUserObject.email;
      let nombre = loggedInUserObject.nombre;

      this.setState({
        email,
        nombre,
      });
    }
  }

  toggleClass = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    console.log(window.location.pathname);
    return (
      <nav
        className="navbar navbar-b navbar-trans navbar-expand-md"
        id="mainNav"
      >
        <div className="container-fluid">
          <Link className="navbar-brand js-scroll" to="/bienvenido/dashboard">
            <img
              src={this.state.logo}
              alt="logo navegador aplicacion"
              style={{ maxWidth: "50px" }}
            />
          </Link>
          {isMobile ? (
            <div></div>
          ) : (
            <h4
              className="bienvenido"
              style={{
                color: "#25625e",
                display: "flex",
                flex: "auto",
                justifyContent: "flex-end",
              }}
            >
              ¡Bienvenido{" "}
              {this.state.nombre === "" || this.state.nombre === undefined
                ? this.state.email
                : this.state.nombre}
              !
            </h4>
          )}

          <button
            className="navbar-toggler collapsed"
            type="button"
            color="#25625e"
            data-toggle="collapse"
            data-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span style={{ backgroundColor: "#25625e" }}></span>
            <span style={{ backgroundColor: "#25625e" }}></span>
            <span style={{ backgroundColor: "#25625e" }}></span>
          </button>
          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarDefault"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/bienvenido/dashboard"
                  style={{ color: "#25625e" }}
                  className={"nav-link js-scroll activee sarasa"}
                >
                  Alumno
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ color: "#25625e" }}
                  className={"nav-link js-scroll sarasa"}
                  to="/login"
                  onClick={logout}
                >
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarApp;
