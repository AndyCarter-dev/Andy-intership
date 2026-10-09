import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../home/Countdown.jsx";
import "./ExploreItem.css";
const ExploreItems = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

useEffect(() => {
  async function getApiData() {
    setLoading(true);
    try {
      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      console.error("Failed to load items:", error);
    } finally {
      setLoading(false);
    }
  }
  getApiData();
}, [filter]);

  function handleLoadMore() {
    if (visibleItems >= Data.length) {
      setVisibleItems(8);
    } else {
      setVisibleItems(visibleItems + 4);
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" 
        onChange={(event
        ) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <div className="nft__item skeleton-card">
                <div className="author_list_pp">
                  <span className="skeleton skeleton-avatar-sm"></span>
                </div>
                <div className="skeleton skeleton-countdown"></div>

                <div className="nft__item_wrap">
                  <span className="skeleton skeleton-image"></span>
                </div>

                <div className="nft__item_info">
                  <span className="skeleton skeleton-title"></span>
                  <span className="skeleton skeleton-price"></span>
                  <span className="skeleton skeleton-likes"></span>
                </div>
              </div>
            </div>
          ))
        : Data.slice(0, visibleItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <Countdown expiryDate={item.expiryDate} />
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
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {!loading && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            {visibleItems < Data.length ? "Load more" : "Show Less"}
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
