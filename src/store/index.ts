import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import documentsReducer from "./slices/documentsSlice";
import { RootState } from "../types";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export const selectAuth = (state: RootState) => state.auth;
export const selectDocuments = (state: RootState) => state.documents;
