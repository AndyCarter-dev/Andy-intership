import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";

const categories = [
  { icon: "fa-image", label: "Art" },
  { icon: "fa-music", label: "Music" },
  { icon: "fa-search", label: "Domain Names" },
  { icon: "fa-globe", label: "Virtual Worlds" },
  { icon: "fa-vcard", label: "Trading Cards" },
  { icon: "fa-th", label: "Collectibles" },
];

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Reveal className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </Reveal>
          </div>
          {categories.map((category, index) => (
            <Reveal
              key={category.label}
              className="col-md-2 col-sm-4 col-6 mb-sm-30"
              direction="zoom"
              delay={index * 80}
            >
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className={`fa ${category.icon}`}></i>
                <span>{category.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
