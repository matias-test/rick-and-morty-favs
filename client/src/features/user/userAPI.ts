import { AxiosError } from 'axios';
import client, { toDataResponse, toErrorResponse } from '../../services/client';
import User from '../../types/models/User';
import BackendResponse from '../../types/responses/BackendResponse';

const userAPI = {
  async authenticate(credentials: { username: string; password: string }): Promise<BackendResponse<User>> {
    try {
      const response = await client.post<User>('/user/authenticate', credentials);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error as AxiosError);
    }
  },
  async register(credentials: { username: string; password: string }): Promise<BackendResponse<User>> {
    try {
      const response = await client.post<User>('/user/register', credentials);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error as AxiosError);
    }
  }
}

export default userAPI;
