import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4500/donation";
axios.defaults.withCredentials = true;

export const useDonationStore = create((set) => ({
  error: null,
  isLoading: false,
  donation: null,
  isSuccess: false,
  donations: null,
  transaction: null,
  getDonationCodes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/donation-codes`);

      set({
        donations: response.data.donations,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting donation list",
        isLoading: false,
      });
      //   console.log(error);

      throw error;
    }
  },
  createDonation: async (donationCode, donationDesc) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/create-donation`, {
        code: donationCode,
        desc: donationDesc,
      });
      set({
        isSuccess: response.data.success,
        donation: response.data.donation,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error creating donation code",
        isLoading: false,
      });
      throw error;
    }
  },
  makeDonation: async (
    donationCode,
    donationAmount,
    donationCurrency,
    memberId
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/make-donation`, {
        donationCode,
        donationAmount,
        donationCurrency,
        memberId,
      });
      set({
        isSuccess: response.data.success,
        transaction: response.data.transaction,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error making donation",
        isLoading: false,
      });
      throw error;
    }
  },
}));
