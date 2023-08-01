import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// const fetchUserById = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async (userId: number, thunkAPI) => {
//     const response = await fetchById()
//     return response.data
//   }
// )
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
  // extraReducers:(builder)=>{
  //   builder.addCase(fetchUserById.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.entities.push(action.payload)
  //   })
  //   builder.addCase(fetchUserById.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.entities.push(action.payload)
  //   })
  //   builder.addCase(fetchUserById.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.entities.push(action.payload)
  //   })
  // }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
