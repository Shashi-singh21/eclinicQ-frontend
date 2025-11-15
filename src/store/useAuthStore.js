import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Centralized auth store to keep and persist JWT/access token
const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      doctorDetails: null,
      doctorLoading: false,
      doctorError: '',
      // Set or update the access token
      setToken: (token) => set({ token }),
      // Optionally keep minimal user info if available from login
      setUser: (user) => set({ user }),
      // Clear all auth data (e.g., on logout or 401)
      clearAuth: () => set({ token: null, user: null, doctorDetails: null }),
      // Helpers
      isAuthenticated: () => Boolean(get().token),
      getAuthHeader: () => {
        const t = get().token;
        return t ? { Authorization: `Bearer ${t}` } : {};
      },
      fetchDoctorDetails: async (svc) => {
        // svc should be getDoctorMe
        if (!get().token || !svc) return;
        set({ doctorLoading: true, doctorError: '' });
        try {
          const data = await svc();
          const doc = data?.data || data?.doctor || null;
          set({ doctorDetails: doc, doctorLoading: false });
        } catch (e) {
          set({ doctorError: e?.response?.data?.message || e.message || 'Failed to load doctor', doctorLoading: false });
        }
      },
    }),
    {
      name: 'auth-store', // localStorage key
      version: 1,
      partialize: (state) => ({ token: state.token, user: state.user, doctorDetails: state.doctorDetails }),
    }
  )
);

export default useAuthStore;
