import React, { useEffect, useState } from 'react';
import { Character } from 'rickmortyapi/dist/interfaces';
import Loading from '../../components/Loading/Loading';
import { useApiClient } from '../../context/ApiClientProvider';
import { isFailureResponse } from '../../types/responses/FailureResponse';
import CharacterCard from './components/CharacterCard';
import './CharactersList.css';

export default function CharactersList () {
  const apiClient = useApiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);

      const response = await apiClient.list();
      setIsLoading(false);

      if (isFailureResponse(response)) {
        setError(response.message || 'There was an error loading the characters');

        return;
      }

      setError(null);
      setCharacters(response.data.results || []);
    };

    loadCharacters();
  }, [setIsLoading, apiClient]);

  return (
    <Loading error={error} loading={isLoading}>
      <div className="characters-list">
        {characters.map((character) => <CharacterCard key={character.id} character={character} />)}
      </div>
    </Loading>
  );
}
