import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "../../models/user";
import { userService } from "../../services/users";
import type { ApiError } from "../../utils/handleApiError";
import { handleApiError } from "../../utils/handleApiError";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ApiError; state: RootState }
>("users/fetch", async (_, { getState, rejectWithValue }) => {
  const list = getState().users.list;

  //caching
  if (list && list.length > 0) {
    return list;
  }

  try {
    const response = await userService.getAll();
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

interface UserState {
  list: User[] | null;
  loading: boolean;
  error: ApiError | null;
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
    updateUserInStore(state, action: PayloadAction<User>) {
      if (!state.list) return;

      const updated = action.payload;
      const index = state.list.findIndex((u) => u.id === updated.id);

      if (index !== -1) {
        state.list[index] = updated;
      }
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
        state.error = action.payload ?? { message: "Unknown error" };
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;