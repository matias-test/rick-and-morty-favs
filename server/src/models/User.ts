import { IUser } from '../types/user';
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
}, { timestamps: true })


export default model<IUser>('User', userSchema)
