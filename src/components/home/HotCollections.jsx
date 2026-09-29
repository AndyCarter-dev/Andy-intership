import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./HotCollections.css";

const HotCollections = () => {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getApiData() {
      try {
        const { data } = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
        )
        setApiData(data)
      } catch (error) {
        console.error('Failed to load collections:', error)
      } finally {
        setLoading(false) // runs whether the request succeeded or failed
      }
    }
    getApiData()
  }, [])

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll skeleton-card">
                  <div className="skeleton skeleton-image"></div>
                  <div className="skeleton skeleton-avatar"></div>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-subtitle"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <OwlCarousel className="owl-theme hot-collections" {...options}>
            {apiData.map((card) => (
              <div className="nft_coll" key={card.id || card.nftId}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={card.nftImage} className="img-fluid" alt={card.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="pp-coll" src={card.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{card.title}</h4>
                  </Link>
                  <span>ERC-{card.nftId}</span>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </section>
  )
}

export default HotCollections;
