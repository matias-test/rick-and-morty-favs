import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import CharacterCard from './components/CharacterCard';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { listCharacters, selectAllCharactersUntil } from '../../features/characters/charactersSlice';
import './CharactersList.scss';

export default function CharactersList () {
  const location = useLocation()
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const pages = useAppSelector((state) => state.characters.pages)
  const isLoading = useAppSelector((state) => state.characters.isLoadingPage)
  const error = useAppSelector((state) => state.characters.loadingPageError)
  const characters = useAppSelector(selectAllCharactersUntil(page));

  const handleNextPageLoad = async () => {
    setPage(page + 1);
  }

  useEffect(() => {
    setPage(1);
  }, [location])

  useEffect(() => {
    dispatch(listCharacters(page))
    setHasMore(pages > 0 && page < pages);
  }, [dispatch, page, pages]);

  return (
    <>
      <div className="characters-list">
        {characters.map((character) => <CharacterCard key={character.id} character={character} />)}
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div>error</div>}
      { hasMore && (
        <button className="link loading" onClick={handleNextPageLoad} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Next Page'}
        </button>
      )}
    </>
  );
}
