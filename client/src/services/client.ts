import axios, { AxiosError, AxiosResponse } from 'axios';
import FailureResponse from '../types/responses/FailureResponse';
import SuccessfulDataResponse from '../types/responses/SuccessfulDataResponse';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config: any) => {
    const newConfig = { headers: {}, ...config };
    const token = window.localStorage.getItem('id_token');

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
  },
  (e: any) => Promise.reject(e),
);

export function toDataResponse<T> (response: AxiosResponse<T>): SuccessfulDataResponse<T> {
  return {
    status: response.status,
    data: response.data
  };
}

export function toErrorResponse (errorResponse: AxiosError): FailureResponse {
  if (errorResponse.response) {
    return { ...errorResponse.response.data, status: errorResponse.response.status };
  }

  return { error: 'Unexpected error', status: 500 };
}

export default client;
