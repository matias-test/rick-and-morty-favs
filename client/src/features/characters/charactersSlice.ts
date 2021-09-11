import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Character, Info } from 'rickmortyapi/dist/interfaces';
import { RootState } from '../../store';
import { isSuccessfulResponse } from '../../types/responses/SuccessfulDataResponse';
import charactersAPI from './charactersAPI';

interface CharactersState {
  charactersById: { [id: string | number]: Character };
  charactersByPage: { [page: string | number]: number[] };

  count: number;
  pages: number;

  isLoadingPage: boolean;
  isLoadingCharacter: boolean;

  loadingPageError: string;
  loadingCharacterError: string;
}

const initialState: CharactersState = {
  charactersById: {},
  charactersByPage: {},

  count: -1,
  pages: -1,

  isLoadingPage: false,
  isLoadingCharacter: false,

  loadingPageError: '',
  loadingCharacterError: '',
}

const listCharacters = createAsyncThunk(
  'characters/listCharacters',
  async (page: number, thunkAPI): Promise<Info<Character[]>> => {
    const storedPage = selectCharactersPage(page)(thunkAPI.getState() as RootState);
    if (storedPage) {
      return { results: storedPage };
    }

    const response = await charactersAPI.list(page)
    if (isSuccessfulResponse(response)) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
)

export const charactersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listCharacters.fulfilled, (state, action) => {
      if (action.payload.info) {
        state.count = action.payload.info.count;
        state.pages = action.payload.info.pages;
      }
      if (action.payload.results) {
        state.charactersById = {
          ...state.charactersById,
          ...(action.payload.results.reduce((acc, character) => ({
            ...acc,
            [character.id]: character,
          }), {}))
        };
        state.charactersByPage = {
          ...state.charactersByPage,
          [action.meta.arg]: action.payload.results.map(({ id }) => id),
        };
      }
      state.isLoadingPage = false;
      state.loadingPageError = '';
    })
    builder.addCase(listCharacters.rejected, (state, action) => {
      state.isLoadingPage = false;
      state.loadingPageError = action.error.message || 'Please try again later';
    })
    builder.addCase(listCharacters.pending, (state, action) => {
      state.isLoadingPage = true;
      state.loadingPageError = '';
    })
  }
});

// Action creators are generated for each case reducer function
export { listCharacters };

export const selectAllCharactersUntil = (page: number) => (state: RootState) => {
  return Object.values(state.characters.charactersByPage).slice(0, page).flat()
    .map((id) => state.characters.charactersById[id])
};

export const selectCharactersPage = (page: number) => (state: RootState) => {
  if (!state.characters.charactersByPage[page]) {
    return null;
  }
  return Object.values(state.characters.charactersByPage[page])
    .map((id) => state.characters.charactersById[id])
};

export default charactersSlice.reducer;
