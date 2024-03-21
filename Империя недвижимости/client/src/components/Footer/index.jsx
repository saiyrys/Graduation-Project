import React from "react";

import logo from "../../assets/logo.png";

import style from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style["footer"]}>
      <Link to='/' onClick={() => window.scrollTo(0, 0)}>
        <div className={style["logo-and-title"]}>
          <img className={style["logo"]} src={logo} alt='' />
          <div className={style["line"]}></div>
          <div className={style["title"]}>Империя недвижимости</div>
        </div>
      </Link>
      <div className={style["menu"]}>
        <div className={style["products"]}>
          <h5>PRODUCTS</h5>
          <div>
            <p>Houses</p>
            <p>Flats</p>
            <p>
              Createb <br /> announcement
            </p>
            <p></p>
          </div>
        </div>
        <div className={style["contact"]}>
          <h5>CONTACT</h5>
          <div>
            <p>Twitter</p>
            <p>Discord</p>
            <p>LinkedIn</p>
            <p>Email</p>
          </div>
        </div>
        <div className={style["company"]}>
          <h5>COMPANY</h5>
          <div>
            <p>About</p>
            <p>Blog</p>
            <p>News</p>
            <p>Careers</p>
            <p>Partners</p>
          </div>
        </div>
        <div className={style["trust-center"]}>
          <h5>TRUST CENTER</h5>
          <div>
            <p>Privecy</p>
            <p>Terms of Use</p>
            <p>Security</p>
            <p>Responsibility</p>
          </div>
        </div>
        <div className={style["developers"]}>
          <h5>DEVELOPERS</h5>
          <div>
            <p>Repetiy Pavel</p>
            <p>GitHub</p>
            <p>Documentation</p>
          </div>
        </div>
      </div>

      <div className={style["bottom"]}>
        <div className={style["separator"]}></div>
        <div className={style["social"]}>
          <p>Twitter</p>
          <p>Discord</p>
          <p>LinkedIn</p>
          <p>Email</p>
        </div>
        <div className={style["right-block"]}>
          <p>Privacy</p>
          <p>Terms of Use</p>
          <p>© "ООО" Империя Недвижимости</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
