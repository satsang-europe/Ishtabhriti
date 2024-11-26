import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4500/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isAdmin: false,
  isCheckingAdmin: false,
  users: null,

  signup: async (
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    streetAddress,
    country,
    province,
    postcode,
    userStatus,
    ritwikName,
    indianFamilyCode
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        streetAddress,
        country,
        province,
        postcode,
        userStatus,
        ritwikName,
        indianFamilyCode,
      });
      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
        isAdmin: response.data.user.userStatus === "admin",
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({
        isAuthenticated: false,
        isAdmin: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyemail`, { code });
      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  resendVerificationEmailCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-verification-mail`, {
        email,
      });
      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          "Error in re-sending verification email",
        isLoading: false,
      });
      throw error;
    }
  },
  listAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users`);

      set({
        users: response.data.users,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting user list",
        isLoading: false,
      });
      throw error;
    }
  },
  approveUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/approve-user`, { userId });
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in approving user",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  checkAdmin: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ error: null, isCheckingAdmin: true });
    try {
      const response = await axios.get(`${API_URL}/check-admin`);

      set({
        user: response.data.user,
        isAdmin: true,
        isCheckingAdmin: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAdmin: false, isAdmin: false });
    }
  },
}));
