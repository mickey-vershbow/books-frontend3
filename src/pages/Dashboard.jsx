import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import FormComponent from "../components/FormComponent.jsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

function Dashboard(props) {
  // destructuring state, dispatch, and variables from State
  const { state, dispatch } = useAppState();
  const { token, url, books, username } = state;

  // const buyLinks = bestsellers.buy_links.map((book) => (
  //   <a href={book.table.url} target="blank">
  //     {book.table.name}
  //   </a>
  // ));

  // Fetch user's books index
  const getBooks = async () => {
    const response = await fetch(url + "/books/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    console.log(response);
    const fetchedBooks = await response.json();
    console.log(fetchedBooks);
    dispatch({ type: "getBooks", payload: fetchedBooks });
  };

  // run getBooks when component is mounted
  React.useEffect(() => {
    getBooks();
  }, []);

  const loaded = () => (
    <div className="dashboard">
      <p className="dashboard-header">
        Hey there, {username}.
        <br />
        Here are your books:{" "}
      </p>
      <section className="form-new-form">
        <Link to="/dashboard/new" className="new-form">
          <Button id="btn-new" style={{ textDecoration: "none" }}>
            New Book
          </Button>
        </Link>
        <Route
          path="/dashboard/:action"
          render={(rp) => <FormComponent {...rp} getBooks={getBooks} />}
        />
      </section>
      <ul className="container">
        {books.map((book) => (
          <Card key={book.rank}>
            <Card.Body>
              <h3 className="show-page__card-title">"{book.title}"</h3>
              <h5 className="show-page__card-subtitle">by {book.author}</h5>
              <div className="show-page__image-container"></div>
              <a href="https://www.google.com">
                <Card.Img
                  src={book.book_image}
                  alt=""
                  className="show-page__img"
                />
              </a>
              <p className="show-page__description">{book.description}</p>
              <div className="dashboard-cards__btn">
                <Button
                  id="btn-edit-delete"
                  onClick={() => {
                    fetch(url + "/books/" + book.id, {
                      method: "delete",
                      headers: {
                        Authorization: "bearer " + token,
                      },
                    }).then(() => getBooks());
                  }}
                >
                  <FaRegTrashAlt className="fa-trash" />
                </Button>
                <a
                  style={{ textDecoration: "none" }}
                  href={book.amazon_product_url}
                  target="blank"
                  className="fa-book-open"
                >
                  <FaBookOpen />
                </a>
              </div>
            </Card.Body>
          </Card>
        ))}
      </ul>
    </div>
  );

  return books ? (
    loaded()
  ) : (
    <div className="loading-message_container">
      <Loader
        type="Puff"
        color="#03dac6"
        height={200}
        width={200}
        // timeout={9000} //9 secs
      />
    </div>
  );
}

export default Dashboard;

{
  /* <Button
                id="btn-edit-delete"
                onClick={() => {
                  dispatch({ type: "select", payload: book });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Book
              </Button> */
}
