import urls from '../config/urls'; // Assuming urls is correctly typed in your config
import { moviesLoaded, resultLoaded } from './reducer'; // Assuming actions are typed in reducer
import { RootState } from './store';
import { apiCall } from './middleware/api';
import { Action, Dispatch } from '@reduxjs/toolkit';

// Action creator to load movies
export const loadMovies =
  (limit: number) =>
  (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(
      apiCall({
        url: urls.discover(limit),
        onSuccess: moviesLoaded.type,
      })
    );
  };
// Action creator to search for movies
export const searchMovies = (query: string = '') => {
  return (dispatch: Dispatch) => {
    dispatch(
      apiCall({
        url: urls.search(query),
        onSuccess: resultLoaded.type,
      })
    );
  };
};
