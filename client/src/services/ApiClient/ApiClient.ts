import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import ApiClientInterface from '../../types/api-client/ApiClientInterface';
import CharacterModel from '../../types/models/CharacterModel';
import BackendResponse from '../../types/responses/BackendResponse';
import FailureResponse from '../../types/responses/FailureResponse';
import SuccessfulDataResponse from '../../types/responses/SuccessfulDataResponse';

export class ApiClient implements ApiClientInterface {
  axios: AxiosInstance;

  constructor (baseURL: string) {
    this.axios = axios.create({ baseURL });
  }

  async toggleFav(id: string): Promise<BackendResponse<CharacterModel>> {
    try {
      const response = await this.axios.post<CharacterModel>(`/characters/${id}/toggle-fav`);

      return ApiClient.toDataResponse(response);
    } catch (error) {
      return ApiClient.toErrorResponse(error as AxiosError);
    }
  }

  async list (): Promise<BackendResponse<{ Items: CharacterModel[] }>> {
    try {
      const response = await this.axios.get<{ Items: CharacterModel[] }>('/characters');

      return ApiClient.toDataResponse(response);
    } catch (error) {
      return ApiClient.toErrorResponse(error  as AxiosError);
    }
  }

  async get (id: string): Promise<BackendResponse<CharacterModel>> {
    try {
      const response = await this.axios.get<CharacterModel>(`/characters/${id}`);

      return ApiClient.toDataResponse(response);
    } catch (error) {
      return ApiClient.toErrorResponse(error  as AxiosError);
    }
  }

  static toDataResponse<T> (response: AxiosResponse<T>): SuccessfulDataResponse<T> {
    return {
      status: response.status,
      data: response.data
    };
  }

  static toErrorResponse (errorResponse: AxiosError): FailureResponse {
    if (errorResponse.response) {
      return { ...errorResponse.response.data, status: errorResponse.response.status };
    }

    return { error: 'Unexpected error', status: 500 };
  }
}

export default ApiClient;
