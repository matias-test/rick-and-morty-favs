import { AxiosError } from 'axios';
import { Character, Info } from 'rickmortyapi/dist/interfaces';
import client, { toDataResponse, toErrorResponse } from '../../services/client';
import BackendResponse from '../../types/responses/BackendResponse';

const charactersAPI = {
  async list(page = 1): Promise<BackendResponse<Info<Character[]>>> {
    try {
      const response = await client.get<Info<Character[]>>(`/characters?page=${page}`);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error  as AxiosError);
    }
  },

  async get (id: string): Promise<BackendResponse<Character>> {
    try {
      const response = await client.get<Character>(`/characters/${id}`);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error  as AxiosError);
    }
  },

  async toggleFav(id: string): Promise<BackendResponse<Character>> {
    try {
      const response = await client.post<Character>(`/characters/${id}/toggle-fav`);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error as AxiosError);
    }
  }
}

export default charactersAPI;
