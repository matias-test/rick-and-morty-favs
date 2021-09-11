import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Character } from 'rickmortyapi/dist/interfaces';
import Loading from '../../components/Loading/Loading';
import { useApiClient } from '../../context/ApiClientProvider';
import { isFailureResponse } from '../../types/responses/FailureResponse';
import CharacterCard from '../CharactersList/components/CharacterCard';

export default function CharacterDetails () {
  const apiClient = useApiClient();
  console.log('useParams', useParams());
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);

      const response = await apiClient.get(id);
      setIsLoading(false);

      if (isFailureResponse(response)) {
        if (response.status === 404) {
          setError('Character not found!');
        } else {
          setError(response.message || 'There was an error loading the character');
        }

        return;
      }

      setError(null);
      setCharacter(response.data);
      console.log(response.data);
    };

    loadCharacters();
  }, [setIsLoading, apiClient, id]);

  // TODO: Do a proper details page
  return (
    <Loading error={error} loading={isLoading}>
      <div className="character-details">
        { character && <CharacterCard character={character} /> }
      </div>
    </Loading>
  );
}
