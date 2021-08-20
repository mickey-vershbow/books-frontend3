import React from "react";
import { useAppState } from "../AppState.jsx";
import Card from "react-bootstrap/Card";
import { useAlert } from "react-alert";
import Form from "react-bootstrap/Form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaBookOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Moment from "react-moment";

function Home(props) {
  const [formData, setFormData] = React.useState({
    date: "",
  });

  // destructuring state, dispatch, and variables from State
  const { state, dispatch } = useAppState();
  const { token, url, bestsellers, bestsellersDate, books } = state;

  //////////////////////////////////////////
  // Fetch NYTimes bestsellers books index
  //////////////////////////////////////////

  const getBestsellers = async () => {
    const response = await fetch(url + "/bestsellers/", {
      method: "get",
      headers: {},
    });
    const fetchedBestsellers = await response.json();
    dispatch({ type: "getBestsellers", payload: fetchedBestsellers });
  };

  //////////////////////////////////////////
  // run getBestsellers when component is mounted
  //////////////////////////////////////////
  React.useEffect(() => {
    getBestsellers();
    return clearTimeout();
  }, []);

  //////////////////////////////////////////
  // Separate API call for list date specs (publish_date, list_type, etc.)
  //////////////////////////////////////////

  // CURRENT LIST
  const getBestsellersCurrentDate = async () => {
    const response = await fetch(url + "/bestsellers/date/current", {
      method: "get",
      headers: {},
    });
    const fetchedDate = await response.json();
    dispatch({ type: "getBestsellersDate", payload: fetchedDate });
  };

  // MOUNT COMPONENT WHEN PAGE LOADS
  React.useEffect(() => {
    getBestsellersCurrentDate();
    return clearTimeout();
  }, []);

  ////////////////////////////////////////////////
  // Function to add a book to user's favorites
  ///////////////////////////////////////////////

  const handleFavorite = async (book) => {
    if (state.token) {
      const response = await fetch(url + "/books/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(book),
      });
      books.push(book);
      console.log(response);
      alert.success(
        <div
          style={{ background: "#03dac6", color: "#000000", padding: "5px" }}
        >
          Added to your favorites!
        </div>
      );
    } else {
      alert.error(
        <div
          style={{ background: "#cf6679", color: "#000000", padding: "5px" }}
        >
          Please log in!
        </div>
      );
    }
  };

  //////////////////////////////////////////
  // Separate Fetch for Bestsellers By Search Input Date
  //////////////////////////////////////////
  const getBestsellersByDate = async (date) => {
    const response = await fetch(url + "/bestsellers/" + date, {
      method: "get",
      headers: {},
    });
    const fetchedBestsellers = await response.json();
    dispatch({ type: "getBestsellers", payload: fetchedBestsellers });
  };

  //////////////////////////////////////////
  // Separate Fetch for Bestsellers Search-By-Date specs
  // This runs as part of handleSubmit function for Search button
  //////////////////////////////////////////
  const getBestsellersArchiveDate = async (date) => {
    const response = await fetch(url + "/bestsellers/archive/" + date, {
      method: "get",
      headers: {},
    });
    const fetchedDate = await response.json();
    dispatch({ type: "getBestsellersDate", payload: fetchedDate });
  };

  //////////////////////////////////////////
  // INITIALIZE SEARCH FORM
  // Get books index at whatever date user inputs into search bar,
  // Update the Date specs,
  // Reset form to blank
  //////////////////////////////////////////
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // books index from search date
    getBestsellersByDate(formData.date);
    // date specs for list corresponding to search
    getBestsellersArchiveDate(formData.date);
    setFormData({
      date: "",
    });
  };

  //////////////////////////////////////////
  // Run Loaded function if data is truthy,
  // otherwise display "loading..."
  //////////////////////////////////////////
  const alert = useAlert();
  const loaded = () => (
    <>
      <section className="date-section">
        <div className="title-container">
          <p className="date-title">{bestsellersDate?.table.list_name}</p>
        </div>
        <div className="date-text-container">
          <p className="date-text">
            <strong>Bestsellers Date: </strong>
            <Moment format="MMMM DD, YYYY">
              {bestsellersDate?.table.bestsellers_date}
            </Moment>
          </p>
        </div>
        <div className="date-text-container">
          <p className="date-text">
            <strong>Published Date: </strong>
            <Moment format="MMMM DD, YYYY">
              {bestsellersDate?.table.published_date}
            </Moment>
          </p>
        </div>
        <div className="search-form_container">
          <Form inline onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              name="date"
              className="search-form mr-sm-2"
              value={formData.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
            />
            <button id="btn-search" type="submit">
              Search
            </button>
          </Form>
        </div>
        <h6 className="date-limit">
          *January 2009 is the farthest back you can go!*
        </h6>
      </section>

      {/* Books Cards */}
      <ul className="container">
        {bestsellers.map((bestseller) => (
          <Card key={bestseller.rank}>
            <Card.Body>
              <Card.Img
                style={{ cursor: "pointer" }}
                src={bestseller.book_image}
                alt=""
                onClick={() => {
                  // show page
                  dispatch({ type: "getBestseller", payload: bestseller });
                  props.history.push("/bestseller/show");
                }}
              />
              <Card.Text>{bestseller.description}</Card.Text>

              {/* Learn-More Button */}

              {/* <Button
                onClick={() => {
                  // show page
                  dispatch({ type: "getBestseller", payload: bestseller });
                  props.history.push("/bestseller/show");
                }}
                id="learn-more"
              >
                Learn More
              </Button> */}

              {/* ICON LINKS */}
              <div className="icons-container">
                <FaStar
                  className="fa-solid fa-star"
                  onClick={() => handleFavorite(bestseller)}
                />
                <a
                  style={{ textDecoration: "none" }}
                  href={bestseller.amazon_product_url}
                  target="blank"
                >
                  {/* <i className="fa-solid fa-book-open">📖︁</i> */}
                  <FaBookOpen className="fa-book-open" />
                </a>
              </div>
            </Card.Body>
          </Card>
        ))}
      </ul>
    </>
  );

  // If books data call is successful, return the results of the loaded() function. If not, show the loading spinner.
  return bestsellers ? (
    loaded()
  ) : (
    <div className="loading-message_container">
      <Loader
        type="Puff"
        color="#03dac6"
        height={200}
        width={200}
        timeout={9000} //9 secs
      />
    </div>
  );
}

export default Home;
