import React, { createContext, useContext, useReducer } from "react";
import uuidv4 from "uuid/v4";

const StateContext = createContext();
const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const Todo = () => {
  const initialState = {
    todos: [],
    textInput: ""
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, textInput: action.payload };
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, { todo: action.payload, id: action.id }],
          textInput: ""
        };
      case "REMOVE_TODO":
        return {
          ...state,
          todos: [...state.todos.filter(i => i.id !== action.payload)]
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Input />
    </StateProvider>
  );
};

const Input = () => {
  const [{ todos, textInput }, dispatch] = useContext(StateContext);
  return (
    <div style={{ padding: "6rem", textAlign: "center" }}>
      {todos.map(i => (
        <div key={uuidv4()}>
          <span style={{ textTransform: "capitalize" }}>{i.todo}</span>{" "}
          <span
            onClick={() => dispatch({ type: "REMOVE_TODO", payload: i.id })}
            style={{ color: "red", textAlign: "right" }}
          >
            x
          </span>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={textInput}
          onChange={e => dispatch({ type: "INPUT", payload: e.target.value })}
        />
        <button
          onClick={() =>
            dispatch({ type: "ADD_TODO", payload: textInput, id: uuidv4() })
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Todo;
