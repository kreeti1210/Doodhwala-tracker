import { create } from "zustand";

import { persist } from "zustand/middleware";

type MilkStore = {
  phoneNumber: string;

  defaultQuantity: number;

  pricePerLiter: number;

  theme: "light" | "dark";

  selectedMonth: string;

  selectedDay: number | null;

  user: any | null;

  setPhoneNumber: (phone: string) => void;

  setDefaultQuantity: (qty: number) => void;

  setPricePerLiter: (price: number) => void;

  toggleTheme: () => void;

  setSelectedMonth: (month: string) => void;

  setSelectedDay: (day: number | null) => void;

  setUser: (user: any | null) => void;

  clearUser: () => void;
};

export const useMilkStore = create<MilkStore>()(
  persist(
    (set) => ({
      phoneNumber: "",

      defaultQuantity: 2,

      pricePerLiter: 60,

      theme: "light",

      selectedMonth: "May 2026",

      selectedDay: null,

      user: null,

      setPhoneNumber: (phone) =>
        set({
          phoneNumber: phone,
        }),

      setDefaultQuantity: (qty) =>
        set({
          defaultQuantity: qty,
        }),

      setPricePerLiter: (price) =>
        set({
          pricePerLiter: price,
        }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      setSelectedMonth: (month) =>
        set({
          selectedMonth: month,
        }),

      setSelectedDay: (day) =>
        set({
          selectedDay: day,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      clearUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "milk-storage",
    },
  ),
);
