import React, { FC } from "react";
import { Table, TableHead } from "@mui/material";
import { Paper } from "@mui/material";

import {
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import { Document } from "../types";

type Props = {
  onEditClick: (doc: Document) => void;
  onDeleteClick: (id: string) => void;
};

const DocumentsTable: FC<Props> = ({ onEditClick, onDeleteClick }) => {
  const { documents, loading } = useAppSelector((state) => state.documents);

  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("documentName")}</TableCell>
            <TableCell>{t("documentType")}</TableCell>
            <TableCell>{t("documentStatus")}</TableCell>
            <TableCell>{t("companySignatureName")}</TableCell>
            <TableCell>{t("companySigDate")}</TableCell>
            <TableCell>{t("employeeSignatureName")}</TableCell>
            <TableCell>{t("employeeNumber")}</TableCell>
            <TableCell>{t("employeeSigDate")}</TableCell>
            <TableCell>{t("actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents?.map((document) => (
            <TableRow key={document.id}>
              <TableCell>{document.documentName}</TableCell>
              <TableCell>{document.documentType}</TableCell>
              <TableCell>{document.documentStatus}</TableCell>
              <TableCell>{document.companySignatureName}</TableCell>
              <TableCell>
                {format(new Date(document.companySigDate), "PPpp")}
              </TableCell>
              <TableCell>{document.employeeSignatureName}</TableCell>
              <TableCell>{document.employeeNumber}</TableCell>
              <TableCell>
                {format(new Date(document.employeeSigDate), "PPpp")}
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onEditClick(document)}
                  disabled={loading}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDeleteClick(document.id)}
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentsTable;
