import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      login: ({ user, token }) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        localStorage.removeItem("banquet-auth");
      },

      setHydrated: (value) =>
        set({
          isHydrated: value,
        }),
    }),
    {
      name: "banquet-auth",

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default useAuthStore;