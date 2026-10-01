import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopSellers.css";
const TopSellers = () => {
  const [topSellers, setTopSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchData() {
    try {
      const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
      setTopSellers(data);
    } catch (error) {
      console.error('Failed to load top sellers:', error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <span className="skeleton skeleton-avatar-sm"></span>
                      </div>
                      <div className="author_list_info">
                        <span className="skeleton skeleton-name"></span>
                        <span className="skeleton skeleton-price"></span>
                      </div>
                    </li>
                  ))
                : topSellers.map((seller, index) => (
                    <li key={seller.authorId || index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.name}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
