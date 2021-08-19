import React from "react";
import { useAppState } from "../AppState.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormComponent = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = props.match.params.action;
  const [formData, setFormData] = React.useState(state[action]);
  const type = props.match.params.form;

  const actions = {
    new: () => {
      return fetch(state.url + "/books", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    edit: () => {
      return fetch(state.url + "/books/" + state.edit.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[action]().then((data) => {
      props.getBooks();
      props.history.push("/dashboard/");
    });
  };

  return (

    <Form className="form" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </Form.Group>
      <Form.Group controlId="formBasicAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="author"
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="description"
        />
      </Form.Group>
      <Button id="btn" value={type} type="submit">
        Submit
      </Button>
    </Form>

    // <div className="form">
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="text"
    //       name="author"
    //       value={formData.author}
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="textarea"
    //       name="description"
    //       value={formData.description}
    //       onChange={handleChange}
    //     />
    //     <input type="submit" value={action} />
    //   </form>
    // </div>
  );
};

export default FormComponent;
