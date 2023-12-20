import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllData } from '../api/apiService'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetchAllData()
  return response
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {
  addToFavourite,
  removeAllFromCart,
  removeFromCart,
} = dataSlice.actions

export default dataSlice.reducer
