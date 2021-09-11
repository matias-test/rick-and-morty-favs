import { Document } from 'mongoose'

export interface IFavoriteCharacters extends Document {
    userId: string;
    characterId: number;
}
