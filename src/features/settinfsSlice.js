import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: localStorage.getItem('tempUnit') || 'metric'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
      localStorage.setItem('tempUnit', state.unit);
    }
  }
});

export const { toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;