import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './charactersState';

import listCharactersReducer, { listCharacters } from './reducers/listCharactersReducer';
import getCharacterReducer, { getCharacter } from './reducers/getCharacterReducer';
import toggleFavReducer, { toggleFav } from './reducers/toggleFavReducer';

import { selectAllCharactersUntil, selectCharactersPage } from './charactersSelectors';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    listCharactersReducer(builder);
    getCharacterReducer(builder);
    toggleFavReducer(builder);
  }
});

export { listCharacters, getCharacter, toggleFav };

export { selectAllCharactersUntil, selectCharactersPage };

export default charactersSlice.reducer;
