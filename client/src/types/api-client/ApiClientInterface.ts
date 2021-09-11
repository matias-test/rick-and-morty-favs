import CharacterModel from '../models/CharacterModel';
import BackendResponse from '../responses/BackendResponse';

interface ApiClientInterface {
  toggleFav(characterId: string): Promise<BackendResponse<CharacterModel>>;

  list (): Promise<BackendResponse<{ Items: CharacterModel[] }>>;

  get (id: string): Promise<BackendResponse<CharacterModel>>;
}

export default ApiClientInterface;
