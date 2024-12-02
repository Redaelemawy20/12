import { Action, Dispatch, MiddlewareAPI } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { apiCallBegin } from '../reducer';

// Define the shape of the action's payload
interface ApiCallBeginPayload {
  url: string;
  onSuccess: string; // Define the action returned by onSuccess (this will depend on your reducer)
}
export const apiCall = createAction<ApiCallBeginPayload>(apiCallBegin.type);
// Define the shape of the action

// Middleware for handling API calls
const apiMiddleware =
  ({ dispatch }: MiddlewareAPI<Dispatch<Action>>) =>
  (next: Dispatch<Action>) =>
  async (action: PayloadAction<ApiCallBeginPayload>) => {
    if (action.type !== apiCall.type) return next(action);

    next(action);

    const { url, onSuccess } = action.payload;
    try {
      // Perform the API request using axios
      const response: AxiosResponse = await axios.request({
        url,
      });

      // Dispatch the onSuccess action with the response data
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // Dispatch the apiRequestFailed action (you can define this in your reducer)
      dispatch({ type: 'apiRequestFailed' });
    }
  };

export default apiMiddleware;
