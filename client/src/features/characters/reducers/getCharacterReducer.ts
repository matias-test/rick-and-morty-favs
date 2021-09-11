import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from '../../../store';
import Character from '../../../types/models/Character';
import { isSuccessfulResponse } from '../../../types/responses/SuccessfulDataResponse';
import charactersAPI from '../charactersAPI';
import { selectCharacterById } from '../charactersSelectors';
import CharactersState from '../charactersState';

const getCharacter = createAsyncThunk(
  'characters/getCharacter',
  async (id: number | string, thunkAPI): Promise<Character> => {
    const storedCharacter = selectCharacterById(id)(thunkAPI.getState() as RootState);
    if (storedCharacter) {
      return storedCharacter;
    }

    const response = await charactersAPI.get(id)
    if (isSuccessfulResponse(response)) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);

const getCharacterReducer = (builder: ActionReducerMapBuilder<CharactersState>) => {
  builder.addCase(getCharacter.fulfilled, (state, action) => {
    const character = action.payload;
    state.charactersById = {
      ...state.charactersById,
      [character.id]: character,
    };

    state.isLoadingCharacter = false;
    state.loadingCharacterError = '';
  })
  builder.addCase(getCharacter.rejected, (state, action) => {
    state.isLoadingCharacter = false;
    state.loadingCharacterError = action.error.message || 'Please try again later';
  })
  builder.addCase(getCharacter.pending, (state, action) => {
    state.isLoadingCharacter = true;
    state.loadingCharacterError = '';
  })
}


export { getCharacter };

export default getCharacterReducer;
