import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as HeartFillIcon } from '../../assets/heart-fill.svg';
import Character from '../../types/models/Character';
import './HeartButton.css'

interface HeartButtonProps {
  character: Character;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CharacterDetails ({ character, disabled, onClick }: HeartButtonProps) {
  return (
    <button
      className={`
        link
        heart-button heart-button${character.isFav ? '--liked' : '--not-liked'}
        ${ disabled ? 'disabled' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <HeartIcon className="icon not-liked" />
      <HeartFillIcon className="icon liked" />
    </button>
  );
}
