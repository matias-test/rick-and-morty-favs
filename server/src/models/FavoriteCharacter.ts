import FavoriteCharacter from '../types/FavoriteCharacter';
import { model, Schema } from 'mongoose'

const favoriteCharactersSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    characterId: {
        type: Number,
        required: true
    },
}, { timestamps: true })


export default model<FavoriteCharacter>('FavoriteCharacter', favoriteCharactersSchema)
