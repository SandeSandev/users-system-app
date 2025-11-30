import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";
import type { User } from "../../models/user";



interface ThunkError {
  message: string;
}

export const fetchUsers = createAsyncThunk<
  Array<User>,
  void,
  { rejectValue: ThunkError; state: RootState }
>("users/fetch", async (_, payloadCreator) => {
  const { getState, rejectWithValue } = payloadCreator;
  const list = getState().list;
  if (list && list.length > 0) {
    return list;
  }
  try {
    const response = await axios.get<Array<User>>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Unknown error" });
  }
});

interface UserState {
  list: Array<User> | null | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.list || state.list.length === 0) {
          state.list = action.payload;
          return;
        }
        if (!state.list || state.list.length === 0) {
          state.list = action.payload;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Unknown error";
      });
  },
});

export const usersReducer = usersSlice.reducer;
