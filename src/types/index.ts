export interface Document {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface DocumentsState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  documents: DocumentsState;
}
