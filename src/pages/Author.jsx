import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/Author.css";

const Author = () => {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function getAuthorData() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(data);
        setFollowers(data.followers);
      } catch (error) {
        console.error("Failed to load author:", error);
      } finally {
        setLoading(false);
      }
    }
    getAuthorData();
  }, [authorId]);

  function handleFollowClick() {
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? followers - 1 : followers + 1);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <span className="skeleton skeleton-avatar-lg"></span>
                        <div className="profile_name">
                          <span className="skeleton skeleton-name-lg"></span>
                          <span className="skeleton skeleton-address"></span>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <span className="skeleton skeleton-followers"></span>
                        <span className="skeleton skeleton-button"></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">@</span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleFollowClick}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData?.nftCollection}
                    authorImage={authorData?.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
