import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../pages/ItemDetails.css";

const Skeleton = ({ width = "100%", height = "1rem", borderRadius = "4px", style }) => (
  <div className="skeleton-box" style={{ width, height, borderRadius, ...style }} />
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height="500px" borderRadius="8px" />
                ) : (
                  <img
                    src={Data.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="70%" height="2.2rem" style={{ marginBottom: "16px" }} />
                  ) : (
                    <h2>
                      {Data.title} #{Data.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    {loading ? (
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Skeleton width="60px" height="1.6rem" borderRadius="12px" />
                        <Skeleton width="60px" height="1.6rem" borderRadius="12px" />
                      </div>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {Data.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {Data.likes}
                        </div>
                      </>
                    )}
                  </div>

                  {loading ? (
                    <div style={{ margin: "20px 0" }}>
                      <Skeleton height="0.9rem" style={{ marginBottom: "8px" }} />
                      <Skeleton height="0.9rem" style={{ marginBottom: "8px" }} />
                      <Skeleton width="80%" height="0.9rem" />
                    </div>
                  ) : (
                    <p>{Data.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      {loading ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <Skeleton width="120px" />
                        </div>
                      ) : (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${Data.ownerId}`}>
                              <img className="lazy" src={Data.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${Data.ownerId}`}>{Data.ownerName}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      {loading ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <Skeleton width="120px" />
                        </div>
                      ) : (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${Data.creatorId}`}>
                              <img className="lazy" src={Data.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${Data.creatorId}`}>{Data.creatorName}</Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {loading ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Skeleton width="20px" height="20px" borderRadius="50%" />
                        <Skeleton width="60px" height="1.2rem" />
                      </div>
                    ) : (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{Data.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
