import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Redux slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
      console.log(action.payload);

      const { id, updatedUser } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedUser };
      }
    },
    addUser: (state, action) => {
      const nextId = Math.max(0, ...state.users.map((user) => user.id)) + 1;
      console.log(nextId);

      const newUser = { ...action.payload, id: nextId };
      state.users = [newUser, ...state.users];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { removeUser, editUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
