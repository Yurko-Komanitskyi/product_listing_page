import { configureStore, Store } from '@reduxjs/toolkit';

import filterReducer from './filter';

export const store: Store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
