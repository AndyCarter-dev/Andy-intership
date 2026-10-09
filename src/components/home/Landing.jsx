import React from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";

const Landing = () => {
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      data-bgimage="url(images/bg-shape-1.jpg) bottom"
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="spacer-single"></div>
              <Reveal>
                <h6>
                  <span className="text-uppercase id-color-2">
                    Ultraverse Market
                  </span>
                </h6>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal delay={120}>
                <h1>Create, sell or collect digital items.</h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="lead">
                  Unit of data stored on a digital ledger, called a blockchain,
                  that certifies a digital asset to be unique and therefore not
                  interchangeable
                </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal delay={360}>
                <Link className="btn-main lead" to="/explore">
                  Explore
                </Link>
              </Reveal>
              <div className="mb-sm-30"></div>
            </div>
            <Reveal className="col-md-6 xs-hide" direction="right" delay={300}>
              <img src={NFT} className="lazy img-fluid" alt="" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
