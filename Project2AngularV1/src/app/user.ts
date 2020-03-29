import { Like } from './like';
import {Friend } from './friend';
export class User {
    id: number;
    location: string;
    username: string;
    password: string;
    likes: Like[];
    friends: Friend[];
}