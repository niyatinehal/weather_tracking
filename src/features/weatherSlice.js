import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  forecast:{},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.data = action.payload;
    },
    setHourlyForecast:(state,action)=>{
      state.forecast=action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWeatherData,setHourlyForecast, setLoading, setError } = weatherSlice.actions;
export default weatherSlice.reducer;
