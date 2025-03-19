import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchDocuments,
  deleteDocument,
  clearError,
} from "../store/slices/documentsSlice";
import { Document } from "../types";

import { useTranslation } from "react-i18next";
import DocumentsTable from "../components/DocumentsTable";
import { DocumentModal } from "../components/modals/DocumentModal";

export const DocumentsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.documents);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(fetchDocuments());
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleOpen = (document?: Document) => {
    if (document) {
      setEditingDocument(document);
    } else {
      setEditingDocument(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDocument(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("deleteDocumentQuestion"))) {
      await dispatch(deleteDocument(id));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">{t("documents")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          {t("addDocument")}
        </Button>
      </Box>

      <DocumentsTable onDeleteClick={handleDelete} onEditClick={handleOpen} />

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      <DocumentModal
        isOpen={open}
        onClose={handleClose}
        document={editingDocument}
      />
    </Box>
  );
};
