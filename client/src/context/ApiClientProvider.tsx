import React, { ReactNode, useContext } from 'react';
import ApiClient from '../services/ApiClient';
import ApiClientInterface from '../types/api-client/ApiClientInterface';

if (!process.env.REACT_APP_API_ENDPOINT) {
  throw new Error('Missing REACT_APP_API_ENDPOINT enviroment variable');
}

const apiClient: ApiClientInterface = new ApiClient(process.env.REACT_APP_API_ENDPOINT);

const ApiClientContext = React.createContext<ApiClientInterface>(apiClient);

function ApiClientProvider ({ children }: { children: ReactNode }) {
  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
}

function useApiClient () {
  return useContext(ApiClientContext);
}

export { ApiClientProvider, useApiClient };
