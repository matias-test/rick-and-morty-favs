import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Info } from 'rickmortyapi/dist/interfaces';
import { RootState } from '../../../store';
import Character from '../../../types/models/Character';
import { isSuccessfulResponse } from '../../../types/responses/SuccessfulDataResponse';
import charactersAPI from '../charactersAPI';
import { selectCharactersPage } from '../charactersSelectors';
import CharactersState from '../charactersState';

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
);

const listCharactersReducer = (builder: ActionReducerMapBuilder<CharactersState>) => {
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


export { listCharacters };

export default listCharactersReducer;
