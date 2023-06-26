import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import tasksReducer from './reducks/tasks/slices';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

/*
export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers(reducers);

  return configureStore({
    reducers: rootReducer
  });

    applyMiddleware(thunk),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
}
*/
