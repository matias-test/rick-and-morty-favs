import { RootState } from '../../store';

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

export const selectCharacterById = (id: number | string) => (state: RootState) => {
  return state.characters.charactersById[id] || null;
};
