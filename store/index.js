import { configureStore } from "@reduxjs/toolkit";

import photoReducer from "./photostate-slice";

const store = configureStore({
  reducer: {
    photo: photoReducer.reducer,
  },
});

export default store;
