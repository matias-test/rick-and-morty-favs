import { Character, Info } from 'rickmortyapi/dist/interfaces';
import BackendResponse from '../responses/BackendResponse';

interface ApiClientInterface {
  toggleFav(characterId: string): Promise<BackendResponse<Character>>;

  list(): Promise<BackendResponse<Info<Character[]>>>;

  get(id: string): Promise<BackendResponse<Character>>;
}

export default ApiClientInterface;
