import types from "./types";

let nextTaskId = 0;

export const addTask = value => ({
  type: types.ADD_TASK,
  value,
});

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter,
});

export const toggleTask = id => ({
  type: types.TOGGLE_TASK,
  id,
});

export default {
  addTask,
  setVisibilityFilter,
  toggleTask,
};
