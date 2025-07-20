import { create } from 'zustand';

export const useStore = create((set) => ({
  recurrence: { type: 'daily', interval: 1, daysOfWeek: [], specificDay: null },
  startDate: '',
  endDate: '',
  setRecurrence: (recurrence) => set({ recurrence }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate })
}));