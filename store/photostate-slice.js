import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photouri: {
      uri: "",
      width: 0,
      height: 0,
    },
    loading: false,
    error: null,
    qrcode: "---",
    barcode: "---",
    /*  imagewidth: 0,
    imageheight: 0, */
  },
  reducers: {
    /* setPhotoUri(state, action) {
      state.photouri = action.payload;
    }, */
    setPhotoUri(state, action) {
      state.photouri = {
        uri: action.payload.uri,
        width: action.payload.width,
        height: action.payload.height,
      };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setQRCode(state, action) {
      state.qrcode = action.payload;
    },
    setBarcode(state, action) {
      state.barcode = action.payload;
    },
    /*   setImageWidth(state, action) {
      state.imagewidth = action.payload;
    },
    setImageHeight(state, action) {
      state.imageheight = action.payload;
    }, */
  },
});

export const photoActions = photoSlice.actions;

export default photoSlice;

/* const photoSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPhotosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPhotosSuccess(state, action) {
      state.loading = false;
      state.photos = action.payload;
    },
    fetchPhotosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPhotosStart, fetchPhotosSuccess, fetchPhotosFailure } =
  photoSlice.actions;

export default photoSlice.reducer;
 */
