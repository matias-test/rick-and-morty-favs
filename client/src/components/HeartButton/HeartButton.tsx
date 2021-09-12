import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as HeartFillIcon } from '../../assets/heart-fill.svg';
import Character from '../../types/models/Character';
import './HeartButton.css'

interface HeartButtonProps {
  character: Character;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CharacterDetails ({ character, disabled, className, onClick }: HeartButtonProps) {
  return (
    <button
      className={`
        link
        heart-button heart-button${character.isFav ? '--liked' : '--not-liked'}
        ${ disabled ? 'disabled' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <HeartIcon className="icon not-liked" />
      <HeartFillIcon className="icon liked" />
    </button>
  );
}
