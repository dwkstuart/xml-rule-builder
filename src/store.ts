import { configureStore } from '@reduxjs/toolkit';
import ruleBuilderReducer from './ruleBuilderSlice';

const store = configureStore({
  reducer: {
    ruleBuilder: ruleBuilderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
