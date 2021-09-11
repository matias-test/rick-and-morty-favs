import { Character as APICharacter} from 'rickmortyapi/dist/interfaces';

export interface CharacterIsFav {
  isFav?: boolean;
}

type Character = APICharacter & CharacterIsFav;

export default Character;
