import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import todoReducer from './features/todo/todoSlice';

const reducers = combineReducers({
  todo: todoReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: 'todo'
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;