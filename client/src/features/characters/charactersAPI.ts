import { AxiosError } from 'axios';
import { Info } from 'rickmortyapi/dist/interfaces';
import client, { toDataResponse, toErrorResponse } from '../../services/client';
import Character, { CharacterIsFav } from '../../types/models/Character';
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

  async get (id: string | number): Promise<BackendResponse<Character>> {
    try {
      const response = await client.get<Character>(`/characters/${id}`);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error  as AxiosError);
    }
  },

  async toggleFav(id: string | number): Promise<BackendResponse<CharacterIsFav>> {
    try {
      const response = await client.post<CharacterIsFav>(`/characters/${id}/toggle-fav`);

      return toDataResponse(response);
    } catch (error) {
      return toErrorResponse(error as AxiosError);
    }
  }
}

export default charactersAPI;
