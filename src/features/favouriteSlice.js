import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: JSON.parse(localStorage.getItem('favorites')) || []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter(city => city !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.cities));
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;