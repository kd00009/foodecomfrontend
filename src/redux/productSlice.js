import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  products: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.products = action.payload;
    },
    addCartItem: (state, action) => {
      const { payload } = action;
      const existingItem = state.cartItem.find(
        (item) => item.id === payload.id
      );
      if (existingItem) {
        toast.error("Already added to cart");
      } else {
        toast.success("Added to cart");
        const total = payload.price;
        state.cartItem.push({ ...payload, total, qty: 1 });
      }
    },

    removeCartItem: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      state.cartItem.splice(index, 1);
    },

    incrementQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyincrease = ++qty;
      state.cartItem[index].qty = qtyincrease;
      const price = state.cartItem[index].price;
      const total = price * qtyincrease;
      state.cartItem[index].total = total;
    },
    decrementQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtydecrease = --qty;
        state.cartItem[index].qty = qtydecrease;
        const price = state.cartItem[index].price;
        const total = price * qtydecrease;
        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  removeCartItem,
  incrementQty,
  decrementQty,
} = productSlice.actions;

export default productSlice.reducer;
