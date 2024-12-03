/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../types/SortType';

interface State {
  data: { sortType: SortType; minPrice: number; maxPrice: number };
}

const initialState: State = {
  data: {
    sortType: SortType.Alphabetically,
    minPrice: 10,
    maxPrice: 40,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.data.sortType = action.payload;
    },
    setMinMax: (state, action: PayloadAction<[number, number]>) => {
      state.data.maxPrice = action.payload[1];
      state.data.minPrice = action.payload[0];
    },
    setDefoult: state => {
      state.data = {
        sortType: SortType.Alphabetically,
        minPrice: 10,
        maxPrice: 40,
      };
    },
  },
});

export const { setSortType, setMinMax, setDefoult } = filterSlice.actions;

export default filterSlice.reducer;
