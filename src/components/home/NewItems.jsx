import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import axios from "axios";
import "./NewItems.css";
import Countdown from "./Countdown";
import Reveal from "../Reveal";

const NewItems = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApiData() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setData(data);
      } catch (error) {
        console.error("Failed to load new items:", error);
      } finally {
        setLoading(false);
      }
    }
    getApiData();
  }, []);

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Reveal className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={150}>
          {loading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item skeleton-card">
                    <div className="skeleton skeleton-image"></div>
                    <div className="skeleton skeleton-avatar"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel className="owl-theme new-items" {...options}>
              {Data.map((card, index) => (
                <div className="nft__item" key={card.id || index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${card.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${card.authorName}`}
                    >
                      <img className="lazy" src={card.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    <Countdown expiryDate={card.expiryDate} />
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${card.nftId}`}>
                      <img
                        src={card.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${card.nftId}`}>
                      <h4>{card.title}</h4>
                    </Link>
                    <div className="nft__item_price">{card.price} Eth </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{card.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default NewItems;
