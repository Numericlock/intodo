import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTasks = createAsyncThunk('tasks/getTasks', async (categoryId) => {
  return await axios.get(`/api/task`, {
    params: { category_id: categoryId }
  }, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
  }).then(res => {
    if (res.data.status !== 200) {
      return;
    }

    return res.data.tasks;
  });
});

export const addTask = createAsyncThunk('tasks/addTask', async (data) => {
  // ToDo を登録
  return await axios.post(`/api/task/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(res => {
    if (res.data.status !== 200) {
      return false;
    }

    return res.data.task;
  });
});

export const doneTask = createAsyncThunk('tasks/doneTask', async (data) => {
  // ToDo を完了させる、または未完了に戻す
  return await axios.post(`/api/task/done`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(res => {
    if (res.data.status !== 200) {
      return false;
    }

    return res.data.task;
  });
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    error: false,
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count += 1;
      console.log(state.count);
    },
    decrease: (state) => {
      state.count -= 1;
      console.log(state.count);
    },
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      console.log('loading');
      state.loading = true;
    },
    [getTasks.fulfilled]: (state, action) => {
      console.log('loaded');
      state.loading = false;
      state.list = action.payload;
    },
    [getTasks.rejected]: (state) => {
      console.log('error');
      state.loading = false;
      state.error = true;
    },
    [addTask.fulfilled]: (state, action) => {
      console.log('added');
      if (action.payload !== false) {
        const newList = state.list.concat(
          action.payload,
        );

        state.list = newList;
      }
    },
    [doneTask.fulfilled]: (state, action) => {
      const index = state.list.findIndex(({id}) => id === action.payload.id);
      const newList = state.list;
      newList[index].done = action.payload.done;
      state.list = newList;

      console.log('changed');
    },
  },
});

export const { increase, decrease } = tasksSlice.actions;

export default tasksSlice.reducer;
