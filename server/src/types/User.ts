import { Document } from 'mongoose'

export default interface User extends Document {
    username: string;
    hash: string;
}
