// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports

export const getColor = createAsyncThunk("appTheme/getColor", async () => {
  let color = localStorage.getItem('color') || '#ffdd62'
  return { color }
});

export const getCategory = createAsyncThunk("appTheme/getCategory", async () => {
  let category = localStorage.getItem('category') || 'Grammatik'
  return { category }
});

export const setCategory = createAsyncThunk("appTheme/setCategory", async (category: string) => {
  localStorage.setItem('category', category)
  return { category };
});

export const setColor = createAsyncThunk("appTheme/setColor", async (color: string) => {
  return { color };
});

export const submitColor = createAsyncThunk(
  "appTheme/submitColor",
  async (color: string) => {
    localStorage.setItem('color', color);
    return { color };
  }
);

export const getTextColor = createAsyncThunk("appTheme/getTextColor", async () => {
  let textColor = localStorage.getItem('textColor') || '#ffdd62'
  return { textColor }
});

export const setTextColor = createAsyncThunk("appTheme/setTextColor", async (textColor: string) => {
    localStorage.setItem('textColor', textColor);
    return { textColor };

});

export const appTheme = createSlice({
  name: "appTheme",
  initialState: {
    color: '#ffdd62',
    textColor: '#ffffff',
    category: 'Grammatik',
    sub_category: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state: any, action: any) => {
        if (action?.payload?.category) state.category = action?.payload?.category;
      })
      .addCase(setCategory.fulfilled, (state: any, action: any) => {
        state.category = action.payload.category;
      })
      .addCase(getTextColor.fulfilled, (state: any, action: any) => {
        if (action?.payload?.textColor) state.textColor = action?.payload?.textColor;
      })
      .addCase(setTextColor.fulfilled, (state: any, action: any) => {
        state.textColor = action.payload.textColor;
      })
      .addCase(getColor.fulfilled, (state: any, action: any) => {
        if (action?.payload?.color) state.color = action?.payload?.color;
      })
      .addCase(setColor.fulfilled, (state: any, action: any) => {
        state.color = action.payload.color;
      })
      .addCase(submitColor.fulfilled, (state: any, action: any) => {
        state.color = action.payload.color;
      });
  },
});

export default appTheme.reducer;