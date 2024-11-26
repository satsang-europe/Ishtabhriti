import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4500/family";
axios.defaults.withCredentials = true;

export const useMemberStore = create((set) => ({
  error: null,
  isLoading: false,
  members: null,
  isSuccess: false,
  getMembers: async (familyCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-members/${familyCode}`);
      set({
        members: response.data.members,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting member list",
        isLoading: false,
      });
      throw error;
    }
  },
  addMember: async (
    familyCode,
    firstName,
    lastName,
    userStatus,
    ritwikName
  ) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.post(`${API_URL}/addmember`, {
        familyCode,
        firstName,
        lastName,
        userStatus,
        ritwikName,
      });

      set({
        isSuccess: response.data.success,
        member: response.data.member,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error adding family member",
        isLoading: false,
      });
      throw error;
    }
  },
  deleteMember: async (memberId) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.post(`${API_URL}/delete-member`, {
        memberId,
      });
      set({
        isSuccess: response.data.success,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error deleting family member",
        isLoading: false,
      });
      throw error;
    }
  },
}));
