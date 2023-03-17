import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: "favourites",
    initialState: { list: [] },
    reducers: {
        addToFavourites(state, action) {
            const newItem = action.payload;
            const existingItem = state.list.find((item) => item.id === newItem.id);
            state.totalQuantity++;

            if (!existingItem) {
                state.list.push({
                    id: newItem.id,
                    price: newItem.current_price,
                    image: newItem.image,
                    name: newItem.id,
                });
            }

        },

        removeFromFavourites(state, action) {
            const name = action.payload.id;
            const existingItem = state.list.find(item => item.name === name);
            state.list = state.list.filter(item => item.name !== name);
        }
    }

})

const store = configureStore({ reducer: { favourites: favouriteSlice.reducer } });

export default store;

export const favouritesActions=favouriteSlice.actions;

