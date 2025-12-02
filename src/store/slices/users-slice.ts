import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "../../models/user";
import { userService } from "../../services/users";

interface ThunkError {
  message: string;
}

export const fetchUsers = createAsyncThunk<
  Array<User>,
  void,
  { rejectValue: ThunkError; state: RootState }
>("users/fetch", async (_, payloadCreator) => {
  const { getState, rejectWithValue } = payloadCreator;
  const list = getState().users.list;
  if (list && list.length > 0) {
    return list;
  }
  try {
    const response = await userService.getAll();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
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
  reducers: {
    updateUserInStore: (state, action: PayloadAction<User>) => {
      if (!state.list) return;
      const updated = action.payload;
      const index = state.list.findIndex((u) => u.id === updated.id);
      if (index === -1) return;
      state.list[index] = updated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Unknown error";
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
