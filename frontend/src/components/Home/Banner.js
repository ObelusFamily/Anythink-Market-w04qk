import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  function searchInputChange(ev) {
    const title = ev.target.value.length > 2 ? ev.target.value : "";
    props.onSearchByTitle(
      title,
      (page) => agent.Items.byTitle(title, page),
      agent.Items.byTitle(title)
    );
  }

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to get</span>
          <input
            id="search-box"
            type="search"
            placeholder="What is that you truly desire?"
            results="0"
            className="item-search-title"
            onChange={searchInputChange}
          />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
