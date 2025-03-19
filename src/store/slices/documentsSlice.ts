import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentsState, Document } from "../../types";
import { documentsAPI } from "../../services/api";

const initialState: DocumentsState = {
  documents: [],
  loading: false,
  error: null,
};

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    return await documentsAPI.getDocuments();
  }
);

export const createDocument = createAsyncThunk(
  "documents/createDocument",
  async (document: Omit<Document, "id">) => {
    const response = await documentsAPI.createDocument(document);
    return response.data || response; // Handle different response formats
  }
);

export const updateDocument = createAsyncThunk(
  "documents/updateDocument",
  async ({ id, document }: { id: string; document: Omit<Document, "id"> }) => {
    return await documentsAPI.updateDocument(id, document);
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (id: string) => {
    await documentsAPI.deleteDocument(id);
    return id;
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch documents";
      })
      // Create Document
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create document";
      })
      // Update Document
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(
          (doc) => doc.id === action.payload.data.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload.data;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update document";
      })
      // Delete Document
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete document";
      });
  },
});

export const { clearError } = documentsSlice.actions;
export default documentsSlice.reducer;
