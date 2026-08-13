import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducks/tasks/slices';
import categoriesReducer from './reducks/categories/slices';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
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
