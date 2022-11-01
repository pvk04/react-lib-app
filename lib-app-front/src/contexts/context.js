import React from "react";

const initialState = {
  books: [],
  readers: [],
  authors: [],
  genres: [],
};

function reducer(state, action) {
  switch (action) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "SET_READERS":
      return {
        ...state,
        readers: action.payload,
      };
    case "SET_AUTHORS":
      return {
        ...state,
        authors: action.payload,
      };
    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
}

export const AppContext = React.createContext();

export function AppProvider({ children }) {
  const value = React.useReducer(reducer, initialState);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
