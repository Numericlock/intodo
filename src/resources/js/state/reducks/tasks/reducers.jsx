import { combineReducers } from "redux";
import CONSTANTS from "./constants";
import types from "./types";
/* State shape
state: {
  tasks: [],
  visibilityFilter: SHOW_ALL
}
*/

// this method can be confusing because it serves two purposes:
// 1 - it create a new task
// 2 - it toggles the done state of an existing task
const task = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        id: action.id,
        text: action.text,
        done: false
      };
    case types.TOGGLE_TASK:
      console.log('a');
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        done: !state.done
      };
    default:
      return state;
  }
};

const tasks = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TASK:
      console.log('add_task');
      return [...state, task(undefined, action)];
    case types.TOGGLE_TASK:
      console.log('i');
      return state.map(t => task(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = CONSTANTS.SHOW_ALL, action) => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const tasksReducer = combineReducers({
  tasks,
  visibilityFilter
});

export default tasksReducer;
