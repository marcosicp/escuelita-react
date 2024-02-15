import React from "react";
import $ from "jquery";
import "../../libs/easing.js";

class BackToTop extends React.Component {
  componentDidMount() {
    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    window.addEventListener("scroll", this.someFunction);
  }

  someFunction= (e) => {
    // window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        document.querySelector(".back-to-top").classList.remove("fadeOut");
        document.querySelector(".back-to-top").style.display = "block";
        document.querySelector(".back-to-top").classList.add("fadeIn");
      } else {
        document.querySelector(".back-to-top").classList.remove("fadeIn");
        document.querySelector(".back-to-top").classList.add("fadeOut");
      }
    // });
  }

  componentWillUnmount() {
    $(window).off("scroll");
    window.removeEventListener("scroll", this.someFunction);
  }

  render() {
    return (
      <a href="#top" className="back-to-top animated">
        <i className="fa fa-chevron-up"></i>
      </a>
    );
  }
}

export default BackToTop;
