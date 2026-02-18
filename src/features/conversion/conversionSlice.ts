import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Conversion {
  files: File[];
  quality: number;
  compressionLevel: number;
  sizes: number[];
  lossless: boolean;
  isProcessing: boolean;
  error: string | null;
}

const initState: Conversion = {
  files: [],
  quality: 75,
  compressionLevel: 4,
  sizes: [],
  lossless: false,
  isProcessing: false,
  error: null
}

const conversionSlice = createSlice({
  name: "conversion",
  initialState: initState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    setQuality: (state, action: PayloadAction<number>) => {
      state.quality = action.payload;
    },
    setCompressionLevel: (state, action: PayloadAction<number>) => {
      state.compressionLevel = action.payload;
    },
    setSizes: (state, action: PayloadAction<number[]>) => {
      state.sizes = action.payload;
    },
    setLossless: (state, action: PayloadAction<boolean>) => {
      state.lossless = action.payload;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetState: () => initState,
  }
});

export const {
  setFiles,
  setQuality,
  setCompressionLevel,
  setSizes,
  setLossless,
  setProcessing,
  setError,
  resetState,
} = conversionSlice.actions;

export default conversionSlice.reducer;