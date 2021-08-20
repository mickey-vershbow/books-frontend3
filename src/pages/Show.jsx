import React from "react";
import { useAppState } from "../AppState.jsx";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Loader from "react-loader-spinner";

function Show(props) {
  // destructuring state, dispatch, and variables from State
  const { state } = useAppState();
  const { bestseller } = state;

  const buyLinks = bestseller.buy_links.map((book) => (
    <a href={book.table.url} target="blank">
      {book.table.name}
    </a>
  ));
  //////////////////////////////////////////
  // Run Loaded function if data is truthy,
  // otherwise display "loading..."
  //////////////////////////////////////////
  const loaded = () => (
    <>
      <h1 id="show-page-header">Rank #{bestseller.rank}</h1>

      {!state.token ? (
        <Link to="/home" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-angles-left show-page__back-button">«︁</i>
        </Link>
      ) : null}
      {state.token ? (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-angles-left show-page__back-button">«︁</i>
        </Link>
      ) : null}

      {/* Books Cards */}
      <div className="container show-page__container">
        <Card key={bestseller.id}>
          <Card.Body>
            <h3 className="show-page__card-title">"{bestseller.title}"</h3>
            <h5 className="show-page__card-subtitle">by {bestseller.author}</h5>
            <div className="show-page__image-container">
              <img
                className="show-page__img"
                src={bestseller.book_image}
                alt=""
              />
            </div>
            <p className="show-page__description">{bestseller.description}</p>
            <hr />
            <div className="card-stats">
            <p>
              <strong>Rank Last Week: </strong>
              {bestseller.rank_last_week}
            </p>
            <p>
              <strong>Weeks On List: </strong>
              {bestseller.weeks_on_list}
            </p>
            <p>
              <strong>Publisher: </strong>
              {bestseller.publisher}
            </p>
            </div>
            <div className="show-page__buy-links-title-container">
              <h3 className="show-page__buy-links-title">Buy This Book</h3>
            </div>
            <div className="show-page__buy-links">{buyLinks}</div>
          </Card.Body>
        </Card>
      </div>
    </>
  );

  return bestseller ? (
    loaded()
  ) : (
    <div className="loading-message_container">
      <Loader
        type="Bars"
        color="#03dac6"
        height={200}
        width={200}
        timeout={9000} //9 secs
      />
    </div>
  );
}

export default Show;
