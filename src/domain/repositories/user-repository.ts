import { User } from '../entities/user.js';
import { UserId } from '@domain/value-objects';
import { Email } from '@domain/value-objects';
import {Result} from "@shared/types/result";

export interface UserRepository {
    save(user: User): Promise<Result<User, Error>>;
    findById(id: UserId): Promise<Result<User | null, Error>>;
    findByEmail(email: Email): Promise<Result<User | null, Error>>;
    findAll(): Promise<Result<User[], Error>>;
    delete(id: UserId): Promise<Result<void, Error>>;
    exists(id: UserId): Promise<Result<boolean, Error>>;
}
