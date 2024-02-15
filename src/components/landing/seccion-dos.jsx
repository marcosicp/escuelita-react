import React from "react";
import horarios from "../../assets/img/horarios.jpeg";

class SeccionDos extends React.Component {
  render() {
    return (
      <section className="paralax-mf footer-paralax bg-image route">
        <div className="row">
          <div className="col-sm-12">
            <div className="contact-mf">
              <div id="contact" className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <div className="title-box-2 pt-4 pt-md-0">
                      <h5 className="title-left">Redes</h5>
                    </div>
                    <div className="more-info">
                      <p className="lead font-seria">
                        Hace click y encontranos en cualquier plataforma.
                      </p>
                      <div className="socials">
                        <ul>
                          <li>
                            <a
                              href="https://www.facebook.com/Canchas-Claret-1446012738977422"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ico-circle">
                                <i className="ion-social-facebook"></i>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/canchas.claret/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ico-circle">
                                <i className="ion-social-instagram"></i>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="copyright-box"></div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}

export default SeccionDos;
