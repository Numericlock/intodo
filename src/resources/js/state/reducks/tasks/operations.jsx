import { useSelector, useDispatch } from 'react-redux'
import actions from "./actions";


export function addTask(dispatch) {
  dispatch(actions.addTask);
}

const setVisibilityFilter = actions.setVisibilityFilter;

const toggleTask = actions.toggleTask;

export default {
  addTask,
  setVisibilityFilter,
  toggleTask
};
