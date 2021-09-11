import { Character, Info } from 'rickmortyapi/dist/interfaces';
import User from '../models/User';
import BackendResponse from '../responses/BackendResponse';

interface ApiClientInterface {
  
  login(credentials: { username: string; password: string }): Promise<BackendResponse<User>>;
  register(credentials: { username: string; password: string }): Promise<BackendResponse<User>>;

  toggleFav(characterId: string): Promise<BackendResponse<Character>>;

  list(): Promise<BackendResponse<Info<Character[]>>>;

  get(id: string): Promise<BackendResponse<Character>>;
}

export default ApiClientInterface;
