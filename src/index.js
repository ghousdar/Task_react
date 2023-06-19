import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { productsFetch } from "../src/slices/productsSlice";
import cartReducer, { getTotals } from "../src/slices/cartSlice";
import authReducer, { loadUser } from "../src/slices/authSlice";
import { productsApi } from "../src/slices/productsApi";


// creating a store
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});



store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.Suspense>
);


