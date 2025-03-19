import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Document } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createDocument,
  updateDocument,
} from "../../store/slices/documentsSlice";

const validationSchema = Yup.object({
  companySignatureName: Yup.string().required("Required"),
  documentName: Yup.string().required("Required"),
  documentStatus: Yup.string().required("Required"),
  documentType: Yup.string().required("Required"),
  employeeNumber: Yup.string().required("Required"),
  employeeSignatureName: Yup.string().required("Required"),
});

const initialValues: Omit<Document, "id"> = {
  companySigDate: new Date().toISOString(),
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: new Date().toISOString(),
  employeeSignatureName: "",
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
};

export const DocumentModal: FC<Props> = ({ isOpen, onClose, document }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.documents);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (document) {
          await dispatch(
            updateDocument({ id: document.id, document: values })
          ).unwrap();
        } else {
          await dispatch(createDocument(values)).unwrap();
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        // Keep the dialog open if there's an error
      }
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  useEffect(() => {
    if (document) {
      formik.setValues({
        companySigDate: document.companySigDate,
        companySignatureName: document.companySignatureName,
        documentName: document.documentName,
        documentStatus: document.documentStatus,
        documentType: document.documentType,
        employeeNumber: document.employeeNumber,
        employeeSigDate: document.employeeSigDate,
        employeeSignatureName: document.employeeSignatureName,
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {document ? t("editDocument") : t("addNewDocument")}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            name="documentName"
            label={t("documentName")}
            value={formik.values.documentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.documentName && Boolean(formik.errors.documentName)
            }
            helperText={
              formik.touched.documentName && formik.errors.documentName
            }
            margin="normal"
            disabled={loading}
          />
          <TextField
            fullWidth
            name="documentType"
            label={t("documentType")}
            value={formik.values.documentType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.documentType && Boolean(formik.errors.documentType)
            }
            helperText={
              formik.touched.documentType && formik.errors.documentType
            }
            margin="normal"
            disabled={loading}
          />
          <TextField
            fullWidth
            name="documentStatus"
            label={t("documentStatus")}
            value={formik.values.documentStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.documentStatus &&
              Boolean(formik.errors.documentStatus)
            }
            helperText={
              formik.touched.documentStatus && formik.errors.documentStatus
            }
            margin="normal"
            disabled={loading}
          />
          <TextField
            fullWidth
            name="companySignatureName"
            label={t("companySignatureName")}
            value={formik.values.companySignatureName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companySignatureName &&
              Boolean(formik.errors.companySignatureName)
            }
            helperText={
              formik.touched.companySignatureName &&
              formik.errors.companySignatureName
            }
            margin="normal"
            disabled={loading}
          />
          <TextField
            fullWidth
            name="employeeSignatureName"
            label={t("employeeSignatureName")}
            value={formik.values.employeeSignatureName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.employeeSignatureName &&
              Boolean(formik.errors.employeeSignatureName)
            }
            helperText={
              formik.touched.employeeSignatureName &&
              formik.errors.employeeSignatureName
            }
            margin="normal"
            disabled={loading}
          />
          <TextField
            fullWidth
            name="employeeNumber"
            label={t("employeeNumber")}
            value={formik.values.employeeNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.employeeNumber &&
              Boolean(formik.errors.employeeNumber)
            }
            helperText={
              formik.touched.employeeNumber && formik.errors.employeeNumber
            }
            margin="normal"
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("cancel")}</Button>
        <Button
          onClick={() => formik.handleSubmit()}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
