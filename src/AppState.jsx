import React, { useContext, useReducer } from "react";

////////////////////////////
// INITIAL STATE
////////////////////////////
const initialState = {
  url: "https://books-on-rails-backend.herokuapp.com",
  // url: "http://localhost:3000",
  token: null,
  username: null,
  books: null,
  bestseller: null,
  date: null,
  new: {
    title: "",
    author: "",
    description: "",
  },
  edit: {
    title: "",
    author: "",
    description: "",
  },
};

///////////////////////
// REDUCER
///////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      break;
    // Get user's books index on dashboard page
    case "getBooks":
      newState = { ...state, books: action.payload };
      return newState;
      break;
    case "select":
      newState = { ...state, edit: action.payload };
      return newState;
      break;
    // get nytimes api current bestsellers list
    case "getBestsellers":
      newState = { ...state, bestsellers: action.payload };
      return newState;
      break;
      // get individual bestseller/:rank
    case "getBestseller":
      newState = { ...state, bestseller: action.payload };
      return newState;
      break;
    // get bestsellersByDate
    case "getBestsellersSearch":
      newState = { ...state, bestsellersSearch: action.payload };
      return newState;
      break;
    // Get list date specs -- requires separate API call
    case "getBestsellersDate":
      newState = { ...state, bestsellersDate: action.payload };
      return newState;
      break;
    default:
      return state;
      break;
  }
};
////////////////////////////
// APP CONTEXT
////////////////////////////

// Object that provides state to everything
const AppContext = React.createContext(null);

////////////////////////////
// APP STATE COMPONENT
////////////////////////////

// dispatch passes the 'action' to the reducer and returns JSX
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // value is what appcontext returns
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

////////////////////////////
// useAppState HOOK
////////////////////////////

export const useAppState = () => {
  return useContext(AppContext);
};
