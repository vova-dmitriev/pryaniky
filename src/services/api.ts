import axios, { AxiosError } from "axios";
import { Document, LoginCredentials } from "../types";

interface ErrorResponse {
  error_code?: number;
  error_text?: string;
}

const HOST = "https://test.v5.pryaniky.com";

const api = axios.create({
  baseURL: HOST,
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorData = error.response?.data as ErrorResponse;
    if (
      error.response?.status === 401 ||
      (errorData && errorData.error_code === 2004)
    ) {
      localStorage.removeItem("token");
      console.error("Authentication error:", errorData);
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth"] = token;
  }
  return config;
});

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(
      "/ru/data/v3/testmethods/docs/login",
      credentials
    );

    return response.data;
  },
};

export const documentsAPI = {
  getDocuments: async () => {
    const response = await api.get("/ru/data/v3/testmethods/docs/userdocs/get");
    return response.data.data;
  },

  createDocument: async (document: Omit<Document, "id">) => {
    try {
      const response = await api.post(
        "/ru/data/v3/testmethods/docs/userdocs/create",
        document
      );
      // Check if the response has the expected format
      if (response.data && response.status === 200) {
        return response.data;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  updateDocument: async (id: string, document: Omit<Document, "id">) => {
    const response = await api.post(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      document
    );
    return response.data;
  },

  deleteDocument: async (id: string) => {
    const response = await api.post(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
    );
    return response.data;
  },
};
