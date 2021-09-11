import React from 'react';
import { Character } from 'rickmortyapi/dist/interfaces';
import { Link } from 'react-router-dom';
import HeartButton from '../../../components/HeartButton/HeartButton';
import './CharacterCard.css';

export default function CharacterCard ({ character }: { character: Character }) {
  return (
    <article className="character-card">
      <Link to={`/${character.id}`}>
        <div className="character-card__image-wrapper">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="character-card__content">
          <h2>
            {character.name}
            <HeartButton character={character} disabled />
          </h2>
        </div>
      </Link>
    </article>
  );
}
