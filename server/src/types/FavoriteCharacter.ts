import { Document } from 'mongoose';

export default interface FavoriteCharacter extends Document {
  userId: string;
  characterId: number;
}
