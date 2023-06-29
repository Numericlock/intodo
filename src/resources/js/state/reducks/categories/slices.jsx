import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  return await axios.get(`/api/category`, {}, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
  }).then(res => {
    if (res.data.status !== 200) {
      return;
    }

    return res.data.categories;
  });
});

export const addCategory = createAsyncThunk('categories/addCategory', async (data) => {
  // カテゴリーを登録
  return await axios.post(`/api/category/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(res => {
    if (res.data.status !== 200) {
      return false;
    }

    return res.data.category;
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

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (data) => {
  // ToDo を完了させる、または未完了に戻す
  return await axios.post(`/api/task/delete`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(res => {
    if (res.data.status !== 200) {
      return false;
    }

    return res.data.id_list;
  });
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    loading: false,
    error: false,
    count: 0,
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      console.log('loading');
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      console.log('loaded');
      state.loading = false;
      state.list = action.payload;
    },
    [getCategories.rejected]: (state) => {
      console.log('error');
      state.loading = false;
      state.error = true;
    },

    [addCategory.pending]: (state) => {
      console.log('loading');
      state.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      console.log('added');
      state.loading = true;
      if (action.payload !== false) {
        const newList = state.list.concat(
          action.payload,
        );

        state.list = newList;
      }
    },
    [addCategory.rejected]: (state) => {
      console.log('error');
      state.loading = false;
      state.error = true;
    },

    [doneTask.pending]: (state) => {
      console.log('loading');
      state.loading = true;
    },
    [doneTask.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload !== false) {
        let newList = state.list;

        // 更新されたタスクのIDから state のインデックスと特定し、完了有無を更新する
        action.payload.forEach((payload) => {
          const index = state.list.findIndex(({id}) => id === payload.id)

          // 検索に引っ掛からなかった場合はスルー
          if (index !== -1) {
            newList[index].done = payload.done;
          }
        })

        state.list = newList;
      }

      console.log('changed');
    },
    [doneTask.rejected]: (state) => {
      console.log('error');
      state.loading = false;
      state.error = true;
    },

    [deleteTask.pending]: (state) => {
      console.log('loading');
      state.loading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload !== false) {
        console.log(action.payload);
        action.payload.forEach((payload) => {
          const index = state.list.findIndex(({id}) => Number(id) === Number(payload));

          state.list.splice(index, 1);
        })
      }

      console.log('deleted');
    },
    [deleteTask.rejected]: (state) => {
      console.log('error');
      state.loading = false;
      state.error = true;
    },
  },
});

export default categoriesSlice.reducer;
