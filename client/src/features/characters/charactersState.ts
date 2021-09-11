import Character from '../../types/models/Character';

export default interface CharactersState {
  charactersById: { [id: string | number]: Character };
  charactersByPage: { [page: string | number]: number[] };

  count: number;
  pages: number;

  isLoadingPage: boolean;
  isLoadingCharacter: boolean;

  loadingPageError: string;
  loadingCharacterError: string;
  favError: string;
}

export const initialState: CharactersState = {
  charactersById: {},
  charactersByPage: {},

  count: -1,
  pages: -1,

  isLoadingPage: false,
  isLoadingCharacter: false,

  loadingPageError: '',
  loadingCharacterError: '',
  favError: '',
}
