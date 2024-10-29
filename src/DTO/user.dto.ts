import { Expose } from "class-transformer";
import { Length } from "class-validator";

export class userDto {
    @Expose()
    id: number;

    @Expose()
    username: string;
    
    @Expose()
    // @Length(6, 30, {message: 'password không hợp lệ!'})
    password: string;
}