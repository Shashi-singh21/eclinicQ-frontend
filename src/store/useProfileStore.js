import { create } from "zustand";

export const useProfileStore = create((set) => ({
  profile: null,                      // stored doctor profile data
  loading: false,                     // for loaders everywhere
  error: null,                        // error message if needed

  setProfile: (data) => set({ profile: data }),
  setLoading: (state) => set({ loading: state }),
  setError: (msg) => set({ error: msg }),

  resetProfile: () => set({ profile: null, loading: false, error: null })
}));
