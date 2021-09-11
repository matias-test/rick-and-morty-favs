import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';

import { selectCharacterById } from '../../features/characters/charactersSelectors';
import { getCharacter, toggleFav } from '../../features/characters/charactersSlice';

import Loading from '../../components/Loading';
import HeartButton from '../../components/HeartButton';
import './CharacterDetails.css'
import NotFound from '../NotFound';

export default function CharacterDetails () {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const isLoading = useAppSelector((state) => state.characters.isLoadingCharacter)
  const error = useAppSelector((state) => state.characters.loadingCharacterError)
  const character = useAppSelector(selectCharacterById(id));

  useEffect(() => {
    dispatch(getCharacter(id))
  }, [dispatch, id]);

  const handleToggleFav = () => {
    dispatch(toggleFav(id));
  };

  // TODO: Do a proper details page
  return (
    <Loading error={error} loading={isLoading}>
      {
        character
        ? (
          <div className="character-details">
            <div className="character-details__image-wrapper">
              <img src={character.image} alt={character.name} />
            </div>
            <div className="character-details__content">
              <div className="section">
                <h2>{character.name}</h2>
                <div className="status">
                  {character.status} - {character.species}
                </div>
              </div>
              <div className="section">
                <div className="text-gray">Last known location:</div>
                <div className="externalLink__ExternalLink-sc-1lixk38-0 bQJGkk">
                  {character.location.name}
                </div>
              </div>
              <div className="section">
                <HeartButton character={character} onClick={handleToggleFav} />
              </div>
            </div>
          </div>
        )
        : <NotFound />
      }
    </Loading>
  );
}
