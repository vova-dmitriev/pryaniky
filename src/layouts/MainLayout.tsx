import { ReactNode } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../types";
import { useTranslation } from "react-i18next";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Management System
          </Typography>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{ color: "inherit" }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
          </Select>

          <IconButton
            color="inherit"
            onClick={() => dispatch(logout())}
            aria-label="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
