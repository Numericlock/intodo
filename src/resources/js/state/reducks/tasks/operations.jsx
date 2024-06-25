import { useSelector, useDispatch } from 'react-redux'
import actions from "./actions";

const setVisibilityFilter = actions.setVisibilityFilter;

const toggleTask = actions.toggleTask;

export default {
  setVisibilityFilter,
  toggleTask
};
