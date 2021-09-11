import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { CharacterIsFav } from '../../../types/models/Character';
import { isSuccessfulResponse } from '../../../types/responses/SuccessfulDataResponse';
import charactersAPI from '../charactersAPI';
import CharactersState from '../charactersState';

const toggleFav = createAsyncThunk(
  'characters/toggleFav',
  async (id: number | string): Promise<CharacterIsFav> => {
    const response = await charactersAPI.toggleFav(id)
    if (isSuccessfulResponse(response)) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);

const toggleFavReducer = (builder: ActionReducerMapBuilder<CharactersState>) => {
  builder.addCase(toggleFav.rejected, (state, action) => {
    const characterId = action.meta.arg;
    if (!state.charactersById[characterId]) {
      return;
    }
    state.charactersById[characterId] = {
      ...state.charactersById[characterId],
      isFav: !state.charactersById[characterId].isFav,
    };
    state.favError = action.error.message || 'There was an error marking the character as fav';
  })
  builder.addCase(toggleFav.pending, (state, action) => {
    state.favError = '';
    const characterId = action.meta.arg;
    if (!state.charactersById[characterId]) {
      return;
    }
    state.charactersById[characterId] = {
      ...state.charactersById[characterId],
      isFav: !state.charactersById[characterId].isFav,
    };
  })
}


export { toggleFav };

export default toggleFavReducer;
